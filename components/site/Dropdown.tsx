"use client";

import { useEffect, useRef, useState } from "react";

export type Option = { value: string; label: string };

type Props = {
  id?: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  onClose?: () => void;
  options: Option[];
  placeholder?: string;
  invalid?: boolean;
  disabled?: boolean;
};

export function Dropdown({
  id,
  name,
  value,
  onChange,
  onClose,
  options,
  placeholder = "Izvēlies...",
  invalid,
  disabled,
}: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        onClose?.();
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, onClose]);

  const choose = (v: string) => {
    onChange(v);
    setOpen(false);
    onClose?.();
  };

  const toggle = () => {
    if (disabled) return;
    setOpen((o) => {
      const next = !o;
      if (next) setActive(Math.max(0, options.findIndex((x) => x.value === value)));
      else onClose?.();
      return next;
    });
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) setOpen(true);
      else setActive((a) => Math.min(a + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (open && active >= 0) choose(options[active].value);
      else toggle();
    } else if (e.key === "Escape" || e.key === "Tab") {
      if (open) {
        setOpen(false);
        onClose?.();
      }
    }
  };

  return (
    <div className={`dd${invalid ? " err" : ""}${open ? " open" : ""}${disabled ? " disabled" : ""}`} ref={ref}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        id={id}
        className="dd-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        onClick={toggle}
        onKeyDown={onKey}
        onBlur={() => {
          if (!open) onClose?.();
        }}
      >
        <span className={selected ? "" : "dd-ph"}>{selected ? selected.label : placeholder}</span>
        <svg className="dd-caret" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 1l5 5 5-5" />
        </svg>
      </button>
      {open && (
        <ul className="dd-list" role="listbox">
          {options.map((o, i) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              className={`dd-opt${o.value === value ? " sel" : ""}${i === active ? " active" : ""}`}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                choose(o.value);
              }}
            >
              {o.label}
              {o.value === value && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
