"use client";
import { useMemo, useState } from "react";
import AddToCartButton from "./AddToCartButton";
import clsx from "clsx";

/**
 * Props:
 * - options: [{name, values[]}]
 * - variants: [{ id, availableForSale, selectedOptions:[{name,value}], price, image }]
 */
export default function VariantSelector({ options = [], variants = [] }) {
  const index = useMemo(() => {
    const map = new Map();
    variants.forEach(v => {
      const key = v.selectedOptions.map(o => `${o.name}:${o.value}`).sort().join("|");
      map.set(key, v);
    });
    return map;
  }, [variants]);

  const firstAvailable = useMemo(() => variants.find(v => v.availableForSale) || variants[0], [variants]);
  const initial = useMemo(() => {
    const obj = {};
    (firstAvailable?.selectedOptions || []).forEach(o => (obj[o.name] = o.value));
    return obj;
  }, [firstAvailable]);

  const [sel, setSel] = useState(initial);

  const variantKey = useMemo(
    () => Object.keys(sel).sort().map(name => `${name}:${sel[name]}`).join("|"),
    [sel]
  );
  const current = index.get(variantKey);

  function setValue(name, value) {
    setSel(prev => ({ ...prev, [name]: value }));
  }

  return (
    <div className="space-y-5">
      {options.map((opt) => (
        <div key={opt.name}>
          <div className="text-sm mb-2 font-medium">{opt.name}</div>
          <div className="flex flex-wrap gap-2">
            {opt.values.map(val => {
              const testSel = { ...sel, [opt.name]: val };
              const key = Object.keys(testSel).sort().map(n => `${n}:${testSel[n]}`).join("|");
              const exists = index.get(key);
              const active = sel[opt.name] === val;
              return (
                <button
                  key={val}
                  onClick={() => exists && setValue(opt.name, val)}
                  className={clsx("option", active && "option-active", !exists && "option-disabled")}
                  aria-pressed={active}
                >
                  {val}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {current ? (
        <div className="space-y-3">
          <div className="badge">Selected: {current.title}</div>
          <AddToCartButton variantId={current.id} className="w-full md:w-auto" />
        </div>
      ) : (
        <div className="text-red-600">This combination is unavailable.</div>
      )}
    </div>
  );
}
