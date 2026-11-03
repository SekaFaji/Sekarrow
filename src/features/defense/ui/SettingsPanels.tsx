import { PixButton } from "../../../components/PixButton";
import { UpgradeCard } from "../../../components/UpgradeCard";

export type SettingsTab = "general" | "sound" | "about";

interface SettingsOverlayProps {
  settingsTab: SettingsTab;
  setSettingsTab: (tab: SettingsTab) => void;
  restorePurchases: () => void;
  restoreMsg: string;
  soundOn: boolean;
  toggleSound: () => void;
  ensureAudio: () => void;
  beep: (freq: number, dur?: number, type?: OscillatorType, vol?: number) => void;
  onPrivacy: () => void;
  onClose: () => void;
}

/** Settings presentation only; browser storage and audio remain in the feature. */
export function SettingsOverlay({
  settingsTab, setSettingsTab, restorePurchases, restoreMsg, soundOn,
  toggleSound, ensureAudio, beep, onPrivacy, onClose,
}: SettingsOverlayProps) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-black/90 p-4"
      style={{ zIndex: 45 }}
    >
      <div
        className="scrollbox flex flex-col border-4 border-black p-3 sm:p-4 max-w-[380px] w-full max-h-[96%] overflow-y-auto"
        style={{ background: "#1c2138" }}
      >
        <div
          className="text-[#8d99ae] text-sm text-center"
          style={{ textShadow: "0 2px 0 #000" }}
        >
          ⚙ SETTINGS
        </div>
        <div role="tablist" aria-label="Settings sections" className="grid grid-cols-3 gap-1 py-2">
          {([
            ["general", "★ GENERAL"],
            ["sound", "🔊 SOUND"],
            ["about", "♦ ABOUT"],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={settingsTab === key}
              onClick={() => setSettingsTab(key)}
              className="min-h-[44px] min-w-0 border-2 border-black px-1 py-2 text-[9px] leading-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd24a]"
              style={{
                background: settingsTab === key ? "#ffd24a" : "#8d99ae",
                color: "#000",
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div
          className="scrollbox overflow-y-auto flex flex-col items-center gap-2 py-2 px-2 border-4 border-black"
          style={{ height: "min(280px, 46dvh)", background: "#262b44" }}
        >
          {settingsTab === "general" && (
            <>
              <p className="text-[9px] text-white/75 text-center leading-[17px]">
                Restore rubies and perks linked to this device, or read our privacy policy.
              </p>
              <UpgradeCard
                icon="↻"
                name="RESTORE PURCHASES"
                desc="Re-load every ruby pack and perk linked to this device."
                cost="FREE"
                action="RESTORE"
                onClick={restorePurchases}
              />
              {restoreMsg && (
                <div className="text-[9px] text-[#4caf50] text-center">{restoreMsg}</div>
              )}
              <UpgradeCard
                icon="📜"
                name="PRIVACY POLICY"
                desc="What the keep knows about you — and it isn't much."
                cost="DOC"
                action="READ"
                onClick={onPrivacy}
              />
            </>
          )}
          {settingsTab === "sound" && (
            <>
              <p className="text-[9px] text-white/75 text-center leading-[17px]">
                Every beep, twang and explosion in the keep.
              </p>
              <UpgradeCard
                icon="🔊"
                name="SOUND"
                desc="Toggle all combat and menu sounds. Saved between sessions."
                cost={soundOn ? "ON" : "OFF"}
                action={soundOn ? "MUTE" : "UNMUTE"}
                onClick={toggleSound}
              />
              <UpgradeCard
                icon="▶"
                name="TEST SOUND"
                desc="Play a short fanfare to check your volume."
                cost="FREE"
                action="PLAY"
                onClick={() => {
                  ensureAudio();
                  beep(660, 0.1);
                  setTimeout(() => beep(880, 0.12), 110);
                }}
              />
            </>
          )}
          {settingsTab === "about" && (
            <>
              <div className="text-[10px] text-white text-center leading-5">
                SEKARROW <span className="text-white/50">v1.0</span>
              </div>
              <div className="text-[9px] text-[#f7a41d] text-center leading-5">
                a SekaFaji Games production
              </div>
              <div className="text-[9px] text-white/75 text-center leading-[17px]">
                Design • Code • Pixels — SekaFaji Games
              </div>
              <div className="text-[9px] text-white/65 text-center leading-[17px]">
                Huge thanks to every keeper who tested the walls.
              </div>
              <div className="text-[9px] text-white/65 text-center leading-[17px]">
                ⛒ Ruby packs • ♦ Perks • 🪱 Earthworms — all in a day's siege.
              </div>
            </>
          )}
        </div>
        <PixButton
          color="#d9433b"
          small
          onClick={onClose}
        >
          CLOSE
        </PixButton>
      </div>
    </div>
  );
}

/** The existing privacy disclosure is unchanged in this architecture patch. */
export function PrivacyOverlay({ onBack }: { onBack: () => void }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-black/90 p-4"
      style={{ zIndex: 55 }}
    >
      <div
        className="scrollbox flex flex-col border-4 border-black p-3 sm:p-4 max-w-[380px] w-full max-h-[96%] overflow-y-auto"
        style={{ background: "#1c2138" }}
      >
        <div
          className="text-[#ffd24a] text-sm text-center"
          style={{ textShadow: "0 2px 0 #000" }}
        >
          📜 PRIVACY POLICY
        </div>
        <div
          className="scrollbox overflow-y-auto flex flex-col gap-2 py-2 px-2 border-4 border-black"
          style={{ height: "min(320px, 53dvh)", background: "#262b44" }}
        >
          <p className="text-[10px] text-white/85 leading-[18px]">
            Sekarrow is built by SekaFaji Games. We do not collect, store, or share any
            personal data.
          </p>
          <p className="text-[10px] text-white/85 leading-[18px]">
            Your progress, gold, and rubies live only on your device (local storage). Nothing
            leaves it.
          </p>
          <p className="text-[10px] text-white/85 leading-[18px]">
            When the game launches, purchases will be processed by Google Play — Google's own
            privacy policy applies to payment details. We never see your identity, contacts,
            or location.
          </p>
          <p className="text-[9px] text-white/65 leading-[17px]">
            Questions? Reach out to SekaFaji Games. (Placeholder text — update it with your
            contact email and store listing before release.)
          </p>
        </div>
        <PixButton color="#d9433b" small onClick={onBack}>
          BACK
        </PixButton>
      </div>
    </div>
  );
}
