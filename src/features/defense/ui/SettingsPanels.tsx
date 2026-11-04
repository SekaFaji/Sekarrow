import { PixButton } from "../../../components/PixButton";
import { UpgradeCard } from "../../../components/UpgradeCard";
import { PixelIcon } from "../../../components/PixelIcon";

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
      className="sekarrow-modal absolute inset-0 flex items-center justify-center bg-black/90 p-2 sm:p-4"
      style={{ zIndex: 45 }}
    >
      <div
        className="scrollbox flex w-full min-w-0 max-w-[390px] max-h-full min-h-0 flex-col overflow-x-hidden overflow-y-auto border-4 border-black p-3 sm:p-4"
        style={{ background: "#1c2138" }}
      >
        <div
          className="text-[#8d99ae] text-[12px] text-center"
          style={{ textShadow: "0 2px 0 #000" }}
        >
          <span className="inline-flex items-center gap-2"><PixelIcon name="settings" size={20} /> SETTINGS</span>
        </div>
        <div role="group" aria-label="Settings sections" className="grid w-full min-w-0 grid-cols-3 gap-1 py-2">
          {([
            ["general", "settings", "GENERAL"],
            ["sound", "sound", "SOUND"],
            ["about", "star", "ABOUT"],
          ] as const).map(([key, icon, label]) => (
            <button
              key={key}
              type="button"
              aria-pressed={settingsTab === key}
              onClick={() => setSettingsTab(key)}
              className="min-h-[44px] min-w-0 border-2 border-black px-1 py-2 text-[8px] leading-[14px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd24a]"
              style={{
                background: settingsTab === key ? "#ffd24a" : "#8d99ae",
                color: "#000",
              }}
            >
              <span className="inline-flex items-center justify-center gap-1"><PixelIcon name={icon} size={15} /> {label}</span>
            </button>
          ))}
        </div>
        <div
          className="scrollbox flex min-w-0 flex-col items-center gap-2 overflow-x-hidden overflow-y-auto border-4 border-black px-2 py-2"
          style={{ height: "min(280px, 46dvh)", background: "#262b44" }}
        >
          {settingsTab === "general" && (
            <>
              <p className="text-[8px] text-white/75 text-center leading-[15px]">
                Restore rubies and perks linked to this device, or read our privacy policy.
              </p>
              <UpgradeCard
                icon={<PixelIcon name="restore" size={20} />}
                name="RESTORE PURCHASES"
                desc="Re-load every ruby pack and perk linked to this device."
                cost="FREE"
                action="RESTORE"
                onClick={restorePurchases}
              />
              {restoreMsg && (
                <div className="text-[8px] text-[#4caf50] text-center">{restoreMsg}</div>
              )}
              <UpgradeCard
                icon={<PixelIcon name="document" size={20} />}
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
              <p className="text-[8px] text-white/75 text-center leading-[15px]">
                Every beep, twang and explosion in the keep.
              </p>
              <UpgradeCard
                icon={<PixelIcon name="sound" size={20} />}
                name="SOUND"
                desc="Toggle all combat and menu sounds. Saved between sessions."
                cost={soundOn ? "ON" : "OFF"}
                action={soundOn ? "MUTE" : "UNMUTE"}
                onClick={toggleSound}
              />
              <UpgradeCard
                icon={<PixelIcon name="play" size={20} />}
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
              <div className="text-[9px] text-white text-center leading-[16px]">
                SEKARROW <span className="text-white/50">v1.0</span>
              </div>
              <div className="text-[8px] text-[#f7a41d] text-center leading-[15px]">
                a SekaFaji Games production
              </div>
              <div className="text-[8px] text-white/75 text-center leading-[15px]">
                Design • Code • Pixels — SekaFaji Games
              </div>
              <div className="text-[8px] text-white/65 text-center leading-[15px]">
                Huge thanks to every keeper who tested the walls.
              </div>
              <div className="text-[8px] text-white/65 text-center leading-[15px]">
                Ruby packs, permanent perks and earthworm defenses in every siege.
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
      className="sekarrow-modal absolute inset-0 flex items-center justify-center bg-black/90 p-2 sm:p-4"
      style={{ zIndex: 55 }}
    >
      <div
        className="scrollbox flex w-full min-w-0 max-w-[390px] max-h-full min-h-0 flex-col overflow-x-hidden overflow-y-auto border-4 border-black p-3 sm:p-4"
        style={{ background: "#1c2138" }}
      >
        <div
          className="text-[#ffd24a] text-[12px] text-center"
          style={{ textShadow: "0 2px 0 #000" }}
        >
          <span className="inline-flex items-center gap-2"><PixelIcon name="document" size={20} /> PRIVACY POLICY</span>
        </div>
        <div
          className="scrollbox flex min-w-0 flex-col gap-2 overflow-x-hidden overflow-y-auto border-4 border-black px-2 py-2"
          style={{ height: "min(320px, 53dvh)", background: "#262b44" }}
        >
          <p className="text-[8px] text-white/85 leading-[15px]">
            Sekarrow is built by SekaFaji Games. We do not collect, store, or share any
            personal data.
          </p>
          <p className="text-[8px] text-white/85 leading-[15px]">
            Your progress, gold, and rubies live only on your device (local storage). Nothing
            leaves it.
          </p>
          <p className="text-[8px] text-white/85 leading-[15px]">
            When the game launches, purchases will be processed by Google Play — Google's own
            privacy policy applies to payment details. We never see your identity, contacts,
            or location.
          </p>
          <p className="text-[8px] text-white/65 leading-[15px]">
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
