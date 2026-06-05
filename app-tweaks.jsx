// app-tweaks.jsx — Tracking Faith tweaks panel

const TF_DEFAULTS = window.TF_DEFAULTS;

const PALETTE_OPTIONS = [
  { value: 'cream',     label: 'Cream paper' },
  { value: 'parchment', label: 'Parchment'   },
  { value: 'oxblood',   label: 'Oxblood'     },
  { value: 'ink',       label: 'Ink (dark)'  },
];

function TFTweaks() {
  const [t, setTweak] = useTweaks(TF_DEFAULTS);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-palette',    t.palette);
    document.documentElement.setAttribute('data-density',    t.density);
    document.documentElement.setAttribute('data-ornaments',  t.showOrnaments ? 'on' : 'off');
  }, [t.palette, t.density, t.showOrnaments]);

  // Jump to the previewed view when "featured" changes (skip first render).
  const first = React.useRef(true);
  React.useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (window.__tf) window.__tf.activate(t.featured);
  }, [t.featured]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Palette" />
      <TweakSelect
        label="Theme"
        value={t.palette}
        options={PALETTE_OPTIONS}
        onChange={(v) => setTweak('palette', v)}
      />

      <TweakSection label="Reading" />
      <TweakRadio
        label="Density"
        value={t.density}
        options={['cozy', 'comfortable', 'airy']}
        onChange={(v) => setTweak('density', v)}
      />
      <TweakToggle
        label="Ornaments"
        value={t.showOrnaments}
        onChange={(v) => setTweak('showOrnaments', v)}
      />
      <TweakToggle
        label="Motion effects"
        value={t.effects}
        onChange={(v) => { window.TF_EFFECTS = v; setTweak('effects', v); }}
      />

      <TweakSection label="Preview view" />
      <TweakSelect
        label="Open"
        value={t.featured}
        options={[
          { value: 'home',      label: 'Home' },
          { value: 'jesus',     label: 'Historical Jesus' },
          { value: 'parallels', label: 'Parallel Stories' },
          { value: 'canon',     label: 'Canon Formation' },
          { value: 'excluded',  label: 'Excluded Texts' },
        ]}
        onChange={(v) => setTweak('featured', v)}
      />

      <TweakSection label="Citation drawer" />
      <TweakButton
        label="Open a sample source →"
        onClick={() => window.__tf && window.__tf.openCite('cite-7')}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<TFTweaks />);
