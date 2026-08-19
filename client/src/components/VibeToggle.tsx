/**
 * Design philosophy: «Wednesday Pulse» — تفاعل صوتي اختياري، قصير وخفيف، لا يعمل قبل اختيار المستخدم.
 */
import { Music2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type AudioLoop = { context: AudioContext; timer: number };

export function VibeToggle() {
  const [enabled, setEnabled] = useState(false);
  const loop = useRef<AudioLoop | null>(null);

  const stop = () => {
    if (!loop.current) return;
    window.clearInterval(loop.current.timer);
    void loop.current.context.close();
    loop.current = null;
    setEnabled(false);
  };

  const start = async () => {
    const AudioCtor = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;
    const context = new AudioCtor();
    await context.resume();

    const playPhrase = () => {
      const now = context.currentTime;
      [220, 277.18, 329.63, 277.18].forEach((note, index) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        const startsAt = now + index * 0.21;
        oscillator.type = index === 0 ? "triangle" : "sine";
        oscillator.frequency.setValueAtTime(note, startsAt);
        gain.gain.setValueAtTime(0.0001, startsAt);
        gain.gain.exponentialRampToValueAtTime(index === 0 ? 0.045 : 0.025, startsAt + 0.025);
        gain.gain.exponentialRampToValueAtTime(0.0001, startsAt + 0.17);
        oscillator.connect(gain).connect(context.destination);
        oscillator.start(startsAt);
        oscillator.stop(startsAt + 0.18);
      });
    };

    playPhrase();
    loop.current = { context, timer: window.setInterval(playPhrase, 980) };
    setEnabled(true);
  };

  useEffect(() => () => stop(), []);

  return (
    <button className={`vibe-toggle ${enabled ? "is-on" : ""}`} type="button" onClick={() => (enabled ? stop() : void start())} aria-pressed={enabled}>
      {enabled ? <Music2 size={15} /> : <VolumeX size={15} />}
      <span>{enabled ? "VIBE ON" : "VIBE OFF"}</span>
    </button>
  );
}
