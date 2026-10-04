# Provisional performance budget and asset gates

These are **engineering targets, not measured results**. Phase 1 records baselines; phase 7 validates them on a mid-range Android device and desktop. Failure prompts quality reduction or design simplification before release.

| Measure | Mobile target | Desktop target | Method |
|---|---:|---:|---|
| Initial HTML + critical CSS | ≤100 KB compressed | ≤120 KB | Network transfer for home route |
| Initial route JS before scene | ≤180 KB compressed | ≤220 KB | Build bundle report |
| First contentful paint, simulated mid-tier 4G | ≤2.5 s | ≤1.8 s | Lighthouse/trace median of 3 runs |
| Scene code + decoders (lazy) | ≤350 KB compressed | ≤450 KB | Build report |
| Entry GLB transfer | ≤1.5 MB | ≤2 MB | Network panel |
| Full visible scene assets at any step | ≤5 MB transfer | ≤10 MB transfer | Network panel, cold cache |
| Single texture | ≤1024² mobile | ≤2048² desktop | Asset manifest |
| Peak GPU texture estimate | ≤96 MB | ≤192 MB | Texture dimensions/formats + device profile |
| Draw calls visible | ≤80 | ≤150 | `renderer.info`, representative scene |
| Visible meshes | ≤200 | ≤400 | Scene instrumentation |
| Dynamic lights / real-time shadows | ≤1 / 0 | ≤2 / ≤1 | Scene config |
| Render resolution scale | DPR ≤1.5 | DPR ≤2 | Device quality selector |
| Frame cadence in active scene | ≥30 fps mobile | ≥55 fps desktop | 30-second trace, median; note 1% lows |

Initial page must paint useful HTML before WebGL compilation. Reader route should not load R3F/Three/GSAP scene chunks. Load asset batches by scene proximity/intent; cancel stale requests where possible. Reuse materials/geometries, use instancing for decorative repetition, cull hidden objects, avoid large transparent layers and expensive postprocessing. Bake lighting; load KTX2 and mesh compression only after on-device decode comparison. Track CPU heap and GPU estimates because download size alone does not predict memory. On sustained low frame rate, step down DPR, particles, texture quality, then switch to flat catalogue. Respect data saver and reduced motion before scene import.

Measurement matrix: Android Chrome mid-range device, high-end desktop Chrome, Firefox desktop, Safari/WebKit where available; cold and warm cache; portrait/landscape; page home, shelf, detail, reader; normal and reduced motion. Record device/browser/version, commit, asset manifest, test conditions, median and 1% low frame rates, FCP/LCP, transfer, draw calls, and observed failures. Do not claim a passing budget from an unmeasured build.
