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
        className="flex flex-col border-4 border-black p-4 max-w-[300px] w-full max-h-[94%]"
        style={{ background: "#1c2138" }}
      >
        <div
          className="text-[#8d99ae] text-sm text-center"
          style={{ textShadow: "0 2px 0 #000" }}
        >
          ⚙ SETTINGS
        </div>
        <div className="flex gap-2 justify-center py-2">
          <PixButton
            small
            color={settingsTab === "general" ? "#ffd24a" : "#8d99ae"}
            onClick={() => setSettingsTab("general")}
          >
            ★ GENERAL
          </PixButton>
          <PixButton
            small
            color={settingsTab === "sound" ? "#ffd24a" : "#8d99ae"}
            onClick={() => setSettingsTab("sound")}
          >
            🔊 SOUND
          </PixButton>
          <PixButton
            small
            color={settingsTab === "about" ? "#ffd24a" : "#8d99ae"}
            onClick={() => setSettingsTab("about")}
          >
            ♦ ABOUT
          </PixButton>
        </div>
        <div
          className="scrollbox overflow-y-auto flex flex-col items-center gap-2 py-2 px-1 border-4 border-black"
          style={{ height: 220, background: "#262b44" }}
        >
          {settingsTab === "general" && (
            <>
              <p className="text-[8px] text-white/50 text-center leading-4">
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
              <p className="text-[8px] text-white/50 text-center leading-4">
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
              <div className="text-[8px] text-white/60 text-center leading-4">
                Design • Code • Pixels — SekaFaji Games
              </div>
              <div className="text-[8px] text-white/40 text-center leading-4">
                Huge thanks to every keeper who tested the walls.
              </div>
              <div className="text-[8px] text-white/40 text-center leading-4">
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
        className="flex flex-col border-4 border-black p-4 max-w-[300px] w-full max-h-[94%]"
        style={{ background: "#1c2138" }}
      >
        <div
          className="text-[#ffd24a] text-sm text-center"
          style={{ textShadow: "0 2px 0 #000" }}
        >
          📜 PRIVACY POLICY
        </div>
        <div
          className="scrollbox overflow-y-auto flex flex-col gap-2 py-2 px-1 border-4 border-black"
          style={{ height: 240, background: "#262b44" }}
        >
          <p className="text-[8px] text-white/70 leading-4">
            Sekarrow is built by SekaFaji Games. We do not collect, store, or share any
            personal data.
          </p>
          <p className="text-[8px] text-white/70 leading-4">
            Your progress, gold, and rubies live only on your device (local storage). Nothing
            leaves it.
          </p>
          <p className="text-[8px] text-white/70 leading-4">
            When the game launches, purchases will be processed by Google Play — Google's own
            privacy policy applies to payment details. We never see your identity, contacts,
            or location.
          </p>
          <p className="text-[8px] text-white/40 leading-4">
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
