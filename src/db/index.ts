import Database from 'better-sqlite3';
import { TimerSettings, CustomBreak, TimerPreset, ChainedPreset, PresetSchedule, WeekDay, PresetChain } from '../types/timer';

const db = new Database('pomi.db');

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    workDuration INTEGER NOT NULL,
    breakDuration INTEGER NOT NULL,
    longBreakDuration INTEGER NOT NULL,
    sessionsUntilLongBreak INTEGER NOT NULL,
    autoContinue BOOLEAN NOT NULL,
    theme TEXT NOT NULL DEFAULT 'light'
  );

  CREATE TABLE IF NOT EXISTS custom_breaks (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    startTime TEXT,
    afterSessions INTEGER,
    duration INTEGER NOT NULL,
    isActive BOOLEAN NOT NULL
  );

  CREATE TABLE IF NOT EXISTS presets (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    workDuration INTEGER NOT NULL,
    breakDuration INTEGER NOT NULL,
    longBreakDuration INTEGER NOT NULL,
    sessionsUntilLongBreak INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS preset_chains (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS chain_presets (
    chain_id TEXT NOT NULL,
    preset_id TEXT NOT NULL,
    repetitions INTEGER NOT NULL,
    order_index INTEGER NOT NULL,
    FOREIGN KEY (chain_id) REFERENCES preset_chains(id) ON DELETE CASCADE,
    FOREIGN KEY (preset_id) REFERENCES presets(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS preset_schedules (
    id TEXT PRIMARY KEY,
    preset_id TEXT,
    chain_id TEXT,
    start_time TEXT NOT NULL,
    is_recurring BOOLEAN NOT NULL,
    specific_date TEXT,
    is_active BOOLEAN NOT NULL,
    FOREIGN KEY (preset_id) REFERENCES presets(id) ON DELETE CASCADE,
    FOREIGN KEY (chain_id) REFERENCES preset_chains(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS schedule_weekdays (
    schedule_id TEXT NOT NULL,
    weekday TEXT NOT NULL,
    FOREIGN KEY (schedule_id) REFERENCES preset_schedules(id) ON DELETE CASCADE,
    PRIMARY KEY (schedule_id, weekday)
  );
`);

// Initialize default settings if not exists
const initSettings = db.prepare(`
  INSERT OR IGNORE INTO settings (
    id, workDuration, breakDuration, longBreakDuration, 
    sessionsUntilLongBreak, autoContinue, theme
  ) VALUES (?, ?, ?, ?, ?, ?, ?)
`);

initSettings.run(1, 25 * 60, 5 * 60, 15 * 60, 4, false, 'light');

// Prepared statements for chains
const chainStatements = {
  addChain: db.prepare(`
    INSERT INTO preset_chains (id, name)
    VALUES (?, ?)
  `),

  addChainPreset: db.prepare(`
    INSERT INTO chain_presets (chain_id, preset_id, repetitions, order_index)
    VALUES (?, ?, ?, ?)
  `),

  getChains: db.prepare(`
    SELECT pc.*, GROUP_CONCAT(cp.preset_id || ':' || cp.repetitions || ':' || cp.order_index) as presets
    FROM preset_chains pc
    LEFT JOIN chain_presets cp ON pc.id = cp.chain_id
    GROUP BY pc.id
  `),

  deleteChain: db.prepare(`
    DELETE FROM preset_chains WHERE id = ?
  `),
};

// Add chain operations to dbOperations
export const dbOperations = {
  // ... (previous operations)

  savePresetChain: (name: string, presets: ChainedPreset[]) => {
    const chainId = Date.now().toString();
    
    const transaction = db.transaction(() => {
      chainStatements.addChain.run(chainId, name);
      
      presets.forEach((preset, index) => {
        chainStatements.addChainPreset.run(
          chainId,
          preset.id,
          preset.repetitions,
          index
        );
      });
    });

    transaction();
    return chainId;
  },

  getPresetChains: (): PresetChain[] => {
    const chains = chainStatements.getChains.all();
    return chains.map(chain => ({
      id: chain.id,
      name: chain.name,
      presets: chain.presets
        ? chain.presets.split(',').map(preset => {
            const [id, repetitions, order] = preset.split(':');
            return {
              ...dbOperations.getPreset(id),
              repetitions: parseInt(repetitions),
              order: parseInt(order),
            };
          })
        : [],
    }));
  },

  deletePresetChain: (id: string) => {
    chainStatements.deleteChain.run(id);
  },
};

export default db;