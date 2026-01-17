"use client";

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void,
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
      {open ? (
        <path
          d="M5 12.5L10 7.5L15 12.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M5 7.5L10 12.5L15 7.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function MoreOptionsAccordion({
  open,
  setOpen,
  skills,
  setSkills,
  skillInput,
  setSkillInput,
  deliverables,
  setDeliverables,
  deliverableInput,
  setDeliverableInput,
  ndaRequired,
  setNdaRequired,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;

  skills: string[];
  setSkills: (v: string[]) => void;
  skillInput: string;
  setSkillInput: (v: string) => void;

  deliverables: string[];
  setDeliverables: (v: string[]) => void;
  deliverableInput: string;
  setDeliverableInput: (v: string) => void;

  ndaRequired: boolean;
  setNdaRequired: (v: boolean) => void;
}) {
  function addSkill() {
    const clean = skillInput.trim();
    if (!clean) return;
    if (skills.includes(clean)) {
      setSkillInput("");
      return;
    }
    setSkills([...skills, clean]);
    setSkillInput("");
  }

  function addDeliverable() {
    const clean = deliverableInput.trim();
    if (!clean) return;
    if (deliverables.includes(clean)) {
      setDeliverableInput("");
      return;
    }
    setDeliverables([...deliverables, clean]);
    setDeliverableInput("");
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => handleKeyboardActivate(e, () => setOpen(!open))}
        className="px-4 py-3 flex items-center justify-between bg-white cursor-pointer select-none"
      >
        <div className="text-sm text-gray-800">
          More options (skills, deliverables, screening)
        </div>
        <div className="text-gray-500">
          <Chevron open={open} />
        </div>
      </div>

      {open ? (
        <div className="px-4 py-4 bg-white border-t">
          {/* Skills */}
          <div className="mb-6">
            <div className="text-sm font-medium text-gray-900 mb-2">
              Skills{" "}
              <span className="text-gray-500 font-normal">(suggested 5–8)</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {skills.map((s) => (
                <div
                  key={s}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700"
                >
                  <span>{s}</span>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setSkills(skills.filter((x) => x !== s))}
                    onKeyDown={(e) =>
                      handleKeyboardActivate(e, () =>
                        setSkills(skills.filter((x) => x !== s)),
                      )
                    }
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    aria-label={`Remove ${s}`}
                  >
                    <XIcon />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                aria-label="Add skill"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Add skill"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                className={[
                  "flex-1 h-10 rounded-md border bg-gray-50 px-3 text-sm",
                  "hover:border-gray-300",
                  "focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400",
                ].join(" ")}
              />

              <div
                role="button"
                tabIndex={0}
                onClick={addSkill}
                onKeyDown={(e) => handleKeyboardActivate(e, addSkill)}
                className="w-10 h-10 rounded-md border bg-white hover:bg-gray-50 inline-flex items-center justify-center cursor-pointer select-none"
                aria-label="Add skill button"
              >
                +
              </div>
            </div>
          </div>

          {/* Deliverables */}
          <div className="mb-6">
            <div className="text-sm font-medium text-gray-900 mb-2">
              Deliverables checklist
            </div>

            {deliverables.length > 0 ? (
              <div className="space-y-2 mb-3">
                {deliverables.map((d) => (
                  <div
                    key={d}
                    className="flex items-center justify-between px-3 h-10 rounded-md bg-gray-50 border"
                  >
                    <div className="text-sm text-gray-800">{d}</div>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() =>
                        setDeliverables(deliverables.filter((x) => x !== d))
                      }
                      onKeyDown={(e) =>
                        handleKeyboardActivate(e, () =>
                          setDeliverables(deliverables.filter((x) => x !== d)),
                        )
                      }
                      className="text-gray-500 hover:text-gray-700 cursor-pointer select-none"
                      aria-label={`Remove ${d}`}
                    >
                      <XIcon />
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            <input
              aria-label="Add custom deliverable"
              value={deliverableInput}
              onChange={(e) => setDeliverableInput(e.target.value)}
              placeholder="Add custom deliverable"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addDeliverable();
                }
              }}
              className={[
                "w-full h-10 rounded-md border bg-gray-50 px-3 text-sm",
                "hover:border-gray-300",
                "focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400",
              ].join(" ")}
            />
            <div className="text-xs text-gray-400 mt-2">
              (Press Enter to add)
            </div>
          </div>

          {/* Screening questions (static) */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-900">
                Screening questions{" "}
                <span className="text-gray-500 font-normal">(0–3)</span>
              </div>
              <div className="text-xs text-gray-400">0/3</div>
            </div>

            <div className="text-xs text-gray-500 mb-2">Templates:</div>

            <div className="text-sm text-gray-700 space-y-1">
              <div className="text-gray-500">
                + What is your experience with this type of project?
              </div>
              <div className="text-gray-500">
                + Can you share examples of similar work?
              </div>
              <div className="text-gray-500">
                + What is your availability to start?
              </div>
              <div className="text-gray-500">
                + Have you worked with [specific tool/technology] before?
              </div>
              <div className="text-gray-500">
                + What is your approach to [specific aspect of project]?
              </div>
            </div>
          </div>

          {/* NDA toggle */}
          <div className="flex items-center justify-between border rounded-lg px-4 py-3">
            <div className="text-sm text-gray-900">Require standard NDA</div>

            <div
              role="button"
              tabIndex={0}
              aria-label="Toggle NDA requirement"
              onClick={() => setNdaRequired(!ndaRequired)}
              onKeyDown={(e) =>
                handleKeyboardActivate(e, () => setNdaRequired(!ndaRequired))
              }
              className={[
                "w-12 h-7 rounded-full cursor-pointer select-none flex items-center",
                ndaRequired
                  ? "bg-green-500 justify-end"
                  : "bg-gray-300 justify-start",
                "px-1",
              ].join(" ")}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
