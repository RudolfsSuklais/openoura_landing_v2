"use client";

import { useState } from "react";
import {
  Ban,
  ChevronDown,
  ChevronUp,
  Edit2,
  Info,
  Search,
  Send,
  Trash2,
  Wrench,
} from "lucide-react";

type Role =
  | "DARBINIEKS"
  | "NOLIKTAVAS DARBINIEKS"
  | "ADMINISTRATORS"
  | "ĪPAŠNIEKS";

type SkillColor = "violet" | "amber" | "emerald" | "rose" | "blue" | "cyan";

type Skill = { label: string; color: SkillColor };

type Instrument = { label: string; serial?: string };

type User = {
  username: string;
  firstName: string;
  email: string;
  role: Role;
  skills: Skill[];
  instrument?: Instrument;
  created: string;
};

const USERS: User[] = [
  {
    username: "raznosana",
    firstName: "Raž",
    email: "razn@gm.co",
    role: "NOLIKTAVAS DARBINIEKS",
    skills: [],
    created: "2026-03-22 09:42:11",
  },
  {
    username: "EinarsB",
    firstName: "Einars",
    email: "einars@gmail.com",
    role: "DARBINIEKS",
    skills: [{ label: "Furnitūra", color: "violet" }],
    created: "2026-02-14 14:08:53",
  },
  {
    username: "ToppV",
    firstName: "Tops",
    email: "tops@gmail.com",
    role: "NOLIKTAVAS DARBINIEKS",
    skills: [
      { label: "Pakošana", color: "violet" },
      { label: "Montāžas materiālu komplektēšana", color: "violet" },
      { label: "Komplektācijas salasīšana", color: "violet" },
      { label: "Packing list sagatavošana", color: "violet" },
    ],
    created: "2026-01-19 10:35:27",
  },
  {
    username: "GintsR",
    firstName: "Gints",
    email: "gints@gmail.com",
    role: "DARBINIEKS",
    skills: [
      { label: "Quadra L-1", color: "rose" },
      { label: "Zāģēšana", color: "amber" },
      { label: "Sagatavošana līmēšanai", color: "amber" },
      { label: "Līmēšana-rāmis", color: "amber" },
      { label: "Blīvējuma iestrāde-rāmis", color: "cyan" },
      { label: "Stiklošana", color: "rose" },
      { label: "Statu sagatavošana", color: "cyan" },
      { label: "Rīģeļu sagatavošana", color: "cyan" },
    ],
    instrument: { label: "Hilti TE 6-A36", serial: "TE6-118429" },
    created: "2025-11-08 16:22:09",
  },
  {
    username: "AntoniaK",
    firstName: "Antonija",
    email: "antonija@gmail.com",
    role: "ADMINISTRATORS",
    skills: [
      { label: "Tāmēšana", color: "emerald" },
      { label: "Klientu komunikācija", color: "blue" },
    ],
    created: "2025-09-14 11:48:35",
  },
];

const ROLE_CLASS: Record<Role, string> = {
  DARBINIEKS: "bg-emerald-100 text-emerald-700 border-emerald-200",
  "NOLIKTAVAS DARBINIEKS": "bg-amber-100 text-amber-700 border-amber-200",
  ADMINISTRATORS: "bg-violet-100 text-violet-700 border-violet-200",
  ĪPAŠNIEKS: "bg-blue-100 text-blue-700 border-blue-200",
};

const SKILL_CLASS: Record<SkillColor, { pill: string; dot: string }> = {
  violet: {
    pill: "bg-violet-50 text-violet-700 border-violet-200",
    dot: "bg-violet-500",
  },
  amber: {
    pill: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
  },
  emerald: {
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
  },
  rose: {
    pill: "bg-rose-50 text-rose-700 border-rose-200",
    dot: "bg-rose-500",
  },
  blue: {
    pill: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  },
  cyan: {
    pill: "bg-cyan-50 text-cyan-700 border-cyan-200",
    dot: "bg-cyan-500",
  },
};

export function LietotajiPage() {
  return (
    <main className="flex-1 min-w-0 bg-white p-4 md:p-6">
      <h2 className="text-[22px] md:text-[28px] font-semibold text-gray-900 leading-tight mb-6">
        Lietotāji
      </h2>
      <AddUserCard />
      <UsersListCard />
    </main>
  );
}

function AddUserCard() {
  return (
    <div className="border border-gray-200 rounded-2xl bg-white p-5 md:p-6 mb-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="w-1 h-5 bg-violet-600 rounded-full" />
        <h3 className="text-[16px] md:text-[18px] font-semibold text-gray-900">
          Pievienot lietotāju
        </h3>
      </div>

      <div className="flex flex-col md:flex-row md:items-stretch gap-3 md:flex-wrap">
        <TextInput placeholder="Lietotājvārds" />
        <TextInput placeholder="Vārds" />
        <TextInput placeholder="E-pasts" type="email" />
        <div className="relative flex-1 min-w-[160px]">
          <input
            type="password"
            placeholder="Parole"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-500"
          />
          <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-gradient-to-r from-violet-400 to-violet-600 rounded-full" />
        </div>
        <RoleSelect />
        <button
          className="inline-flex items-center justify-center text-white text-[14px] font-medium px-6 py-3 rounded-xl shadow-md min-w-[140px] hover:opacity-90 transition-opacity"
          style={{
            background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
            boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
          }}
        >
          Pievienot
        </button>
      </div>
    </div>
  );
}

function TextInput({
  placeholder,
  type = "text",
}: {
  placeholder: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="flex-1 min-w-[160px] px-4 py-3 rounded-xl border border-gray-200 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-500"
    />
  );
}

function RoleSelect() {
  return (
    <div className="relative flex-1 min-w-[160px]">
      <select
        defaultValue="Darbinieks"
        className="w-full appearance-none px-4 py-3 pr-10 rounded-xl border border-gray-200 text-[14px] text-gray-900 bg-white focus:outline-none focus:border-violet-500"
      >
        <option value="Darbinieks">Darbinieks</option>
        <option value="Noliktavas darbinieks">Noliktavas darbinieks</option>
        <option value="Administrators">Administrators</option>
        <option value="Īpašnieks">Īpašnieks</option>
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}

function UsersListCard() {
  return (
    <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden mb-6">
      <div className="px-4 md:px-5 py-4 border-b border-gray-100">
        <div className="relative w-full md:max-w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
          <input
            type="text"
            placeholder="Meklēt lietotāju..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400"
          />
        </div>
      </div>
      <UsersTable />
    </div>
  );
}

const DESKTOP_COLS = "140px 90px 200px 170px 1fr 140px 160px 120px";

function UsersTable() {
  return (
    <div className="overflow-x-auto">
      <div
        className="grid bg-white border-b border-gray-200 px-5 py-3 text-[11px] uppercase font-semibold tracking-[0.05em] text-gray-500 items-center min-w-[1180px]"
        style={{ gridTemplateColumns: DESKTOP_COLS }}
      >
        <HeaderLabel label="Lietotājvārds" />
        <HeaderLabel label="Vārds" withInfo />
        <HeaderLabel label="E-pasts" withInfo />
        <HeaderLabel label="Loma" withInfo />
        <HeaderLabel label="Prasmes" withInfo />
        <HeaderLabel label="Instrumenti" />
        <HeaderLabel label="Izveidots" />
        <HeaderLabel label="Darbības" />
      </div>

      {USERS.map((u, i) => (
        <UserRow key={i} user={u} />
      ))}
    </div>
  );
}

function HeaderLabel({
  label,
  withInfo = false,
}: {
  label: string;
  withInfo?: boolean;
}) {
  return (
    <div className="flex items-center gap-1 min-w-0">
      <span className="truncate">{label}</span>
      {withInfo && <Info className="w-3 h-3 text-gray-400 shrink-0" />}
    </div>
  );
}

function UserRow({ user }: { user: User }) {
  return (
    <div
      className="grid border-b border-gray-100 hover:bg-gray-50 transition-colors px-5 py-5 items-start text-[14px] text-gray-900 min-w-[1180px]"
      style={{ gridTemplateColumns: DESKTOP_COLS }}
    >
      <div className="text-[13px] text-gray-700 truncate pr-2">
        {user.username}
      </div>
      <div className="text-[13px] text-gray-700 truncate pr-2">
        {user.firstName}
      </div>
      <div className="text-[13px] text-gray-600 truncate pr-2">
        {user.email}
      </div>
      <div className="pr-2">
        <RolePill role={user.role} />
      </div>
      <div className="pr-3">
        <SkillsCell skills={user.skills} />
      </div>
      <div className="pr-2">
        <InstrumentBadge instrument={user.instrument} />
      </div>
      <div className="text-[12px] text-gray-500 tabular-nums pr-2">
        {user.created}
      </div>
      <RowActions />
    </div>
  );
}

function RolePill({ role }: { role: Role }) {
  return (
    <span
      className={`inline-flex items-center justify-center text-center rounded-lg border font-bold tracking-wider px-3 py-1.5 text-[11px] ${ROLE_CLASS[role]}`}
    >
      {role}
    </span>
  );
}

const SKILLS_VISIBLE = 3;

function SkillsCell({ skills }: { skills: Skill[] }) {
  const [expanded, setExpanded] = useState(false);
  if (skills.length === 0) {
    return <span className="text-[13px] text-gray-400">—</span>;
  }
  const overflow = skills.length - SKILLS_VISIBLE;
  const visible = expanded || overflow <= 0 ? skills : skills.slice(0, SKILLS_VISIBLE);

  return (
    <div className="flex flex-wrap gap-1.5 items-center">
      {visible.map((s) => {
        const c = SKILL_CLASS[s.color];
        return (
          <span
            key={s.label}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-medium ${c.pill}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
            {s.label}
          </span>
        );
      })}
      {overflow > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-violet-700 hover:bg-violet-50 transition-colors"
        >
          {expanded ? (
            <>
              Sakļaut
              <ChevronUp className="w-3 h-3" />
            </>
          ) : (
            <>
              +{overflow} vēl
              <ChevronDown className="w-3 h-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
}

function InstrumentBadge({ instrument }: { instrument?: Instrument }) {
  if (!instrument) {
    return <span className="text-[12px] text-gray-400">— Nav —</span>;
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-violet-200 bg-violet-50 text-[11px] font-medium text-violet-700">
      <Wrench className="w-3 h-3" />
      <span className="truncate max-w-[120px]">{instrument.label}</span>
      {instrument.serial && (
        <span className="text-violet-500/80 tabular-nums">
          · {instrument.serial}
        </span>
      )}
    </span>
  );
}

function RowActions() {
  return (
    <div className="flex items-center gap-1">
      <button
        aria-label="Labot"
        className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-gray-100 text-gray-500"
      >
        <Edit2 className="w-4 h-4" />
      </button>
      <button
        aria-label="Sūtīt"
        className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-gray-100 text-gray-500"
      >
        <Send className="w-4 h-4" />
      </button>
      <button
        aria-label="Bloķēt"
        className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-gray-100 text-gray-500"
      >
        <Ban className="w-4 h-4" />
      </button>
      <button
        aria-label="Dzēst"
        className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-red-50 text-red-500"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
