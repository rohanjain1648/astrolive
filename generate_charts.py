import matplotlib.pyplot as plt
import numpy as np
import os

# Create assets directory if not exists
os.makedirs('report_assets', exist_ok=True)

# ----------------------------------------------------
# 1. Retention Decay Curve Plot
# ----------------------------------------------------
plt.figure(figsize=(9, 5), dpi=300)
plt.style.use('seaborn-v0_8-darkgrid' if 'seaborn-v0_8-darkgrid' in plt.style.available else 'default')

days = np.array([1, 3, 7, 14, 21, 30])
legacy_retention = np.array([100, 48, 22, 14, 9.5, 7.5])
cosmic_retention = np.array([100, 82, 68, 56, 48, 42.6])

plt.plot(days, legacy_retention, 'o--', color='#ef4444', linewidth=2.5, markersize=8, label='Legacy AstroLive (High Decay: D30 = 7.5%)')
plt.plot(days, cosmic_retention, 'o-', color='#7c3aed', linewidth=3.0, markersize=9, label='Cosmic DNA 2.0 (Habit Plateau: D30 = 42.6%)')

# Annotations
plt.annotate('Habit Plateau (42.6%)', xy=(30, 42.6), xytext=(20, 58),
             arrowprops=dict(facecolor='#7c3aed', shrink=0.08, width=2, headwidth=8),
             fontsize=10, fontweight='bold', color='#7c3aed')

plt.annotate('High Churn (7.5%)', xy=(30, 7.5), xytext=(22, 22),
             arrowprops=dict(facecolor='#ef4444', shrink=0.08, width=2, headwidth=8),
             fontsize=10, fontweight='bold', color='#ef4444')

plt.title('User Retention Decay Curve (D1 - D30 Benchmark)', fontsize=14, fontweight='bold', pad=15, color='#0f172a')
plt.xlabel('Days Post-Onboarding (t)', fontsize=11, fontweight='bold', labelpad=10)
plt.ylabel('Active User Retention (%)', fontsize=11, fontweight='bold', labelpad=10)
plt.ylim(0, 105)
plt.xticks(days, ['D1', 'D3', 'D7', 'D14', 'D21', 'D30'], fontsize=10, fontweight='bold')
plt.legend(frameon=True, facecolor='white', edgecolor='#e2e8f0', fontsize=10, loc='upper right')
plt.tight_layout()
plt.savefig('report_assets/retention_decay_curve.png', bbox_inches='tight')
plt.close()

# ----------------------------------------------------
# 2. System Architecture Diagram (Flowchart)
# ----------------------------------------------------
fig, ax = plt.subplots(figsize=(10, 6), dpi=300)
ax.axis('off')

# Box properties
box_props_primary = dict(boxstyle='round,pad=0.8', facecolor='#7c3aed', alpha=0.95, edgecolor='none')
box_props_secondary = dict(boxstyle='round,pad=0.8', facecolor='#ec4899', alpha=0.95, edgecolor='none')
box_props_gold = dict(boxstyle='round,pad=0.8', facecolor='#f59e0b', alpha=0.95, edgecolor='none')
box_props_teal = dict(boxstyle='round,pad=0.8', facecolor='#06b6d4', alpha=0.95, edgecolor='none')
box_props_bridge = dict(boxstyle='round,pad=0.8', facecolor='#10b981', alpha=0.95, edgecolor='none')

ax.text(0.5, 0.92, 'COSMIC DNA 2.0 SYSTEM ARCHITECTURE & GROWTH FLYWHEEL', 
        fontsize=13, fontweight='bold', ha='center', va='center', color='#0f172a')

# Pillars
ax.text(0.18, 0.68, "PILLAR 1: AI BIRTH CHART\n• Lahiri Sidereal Engine\n• 3D Interactive Kundli\n• 24/7 AI Copilot", 
        fontsize=9, color='white', fontweight='bold', ha='center', va='center', bbox=box_props_primary)

ax.text(0.50, 0.68, "PILLAR 2: VIRAL SYNASTRY\n• 36-Point Ashtakoot Guna\n• High-Res Story Cards\n• 2-Sided Referral Gate", 
        fontsize=9, color='white', fontweight='bold', ha='center', va='center', bbox=box_props_secondary)

ax.text(0.82, 0.68, "PILLAR 3: DAILY RITUAL\n• 3D Tarot Oracle Flip\n• Streak & XP Multipliers\n• 432Hz Audio & Mood Log", 
        fontsize=9, color='white', fontweight='bold', ha='center', va='center', bbox=box_props_gold)

ax.text(0.34, 0.30, "PILLAR 4: ASTRO-COMMERCE\n• AI Certified Gemstones\n• Live Pooja Booking\n• Cosmic DNA Pro (₹149/mo)", 
        fontsize=9, color='white', fontweight='bold', ha='center', va='center', bbox=box_props_teal)

ax.text(0.68, 0.30, "THE HANDOVER BRIDGE\n• 1-Click Context Injection\n• Natal Ephemeris & Dasha Brief\n• Verified Astrologers (₹10/min)", 
        fontsize=9, color='white', fontweight='bold', ha='center', va='center', bbox=box_props_bridge)

# Connection Arrows
arrow_props = dict(arrowstyle='->', lw=2, color='#64748b')
ax.annotate('', xy=(0.34, 0.68), xytext=(0.34, 0.68), arrowprops=arrow_props)
ax.annotate('', xy=(0.66, 0.68), xytext=(0.66, 0.68), arrowprops=arrow_props)
ax.annotate('', xy=(0.50, 0.55), xytext=(0.34, 0.40), arrowprops=arrow_props)
ax.annotate('', xy=(0.50, 0.55), xytext=(0.68, 0.40), arrowprops=arrow_props)

plt.tight_layout()
plt.savefig('report_assets/architecture_diagram.png', bbox_inches='tight')
plt.close()

# ----------------------------------------------------
# 3. 1-Click Handover Sequence Diagram
# ----------------------------------------------------
fig, ax = plt.subplots(figsize=(10, 5), dpi=300)
ax.axis('off')

ax.text(0.5, 0.95, '1-CLICK AI-TO-HUMAN CONSULTATION HANDOVER SEQUENCE', 
        fontsize=13, fontweight='bold', ha='center', va='center', color='#0f172a')

# Actors
actors = ['User Client', 'AI Ephemeris Copilot', 'Vedic DB Engine', 'Astrologer Console']
x_coords = [0.15, 0.38, 0.62, 0.85]

for x, name in zip(x_coords, actors):
    ax.text(x, 0.82, name, fontsize=10, fontweight='bold', ha='center', va='center',
            bbox=dict(boxstyle='square,pad=0.5', facecolor='#1e1b4b', color='white'))
    ax.plot([x, x], [0.15, 0.75], '--', color='#cbd5e1', lw=1.5)

# Sequence steps
steps = [
    (0.15, 0.38, 0.70, '1. Ask life query'),
    (0.38, 0.62, 0.62, '2. Fetch planetary degrees'),
    (0.62, 0.38, 0.54, '3. Return Lagna/Dasha payload'),
    (0.38, 0.15, 0.46, '4. Render AI chart insights'),
    (0.15, 0.85, 0.34, '5. Click "Talk Live (1-Click Handover)"'),
    (0.38, 0.85, 0.24, '6. Inject 360° Ephemeris Briefing Payload')
]

for x1, x2, y, label in steps:
    color = '#7c3aed' if x2 > x1 else '#ec4899'
    ax.annotate('', xy=(x2, y), xytext=(x1, y),
                arrowprops=dict(arrowstyle='->', lw=2, color=color))
    ax.text((x1 + x2)/2, y + 0.03, label, fontsize=8.5, fontweight='bold', ha='center', va='center', color='#334155')

plt.tight_layout()
plt.savefig('report_assets/handover_sequence_flow.png', bbox_inches='tight')
plt.close()

# ----------------------------------------------------
# 4. 12-Month Execution Roadmap Timeline
# ----------------------------------------------------
fig, ax = plt.subplots(figsize=(10, 4.5), dpi=300)

phases = [
  'Phase 1: Core Engine & 3D Kundli',
  'Phase 2: Viral Synastry & Story Cards',
  'Phase 3: Daily Ritual & Streak Engine',
  'Phase 4: 1-Click Astrologer Handover',
  'Phase 5: Pro SaaS (₹149/mo) & Commerce'
]
start_months = [1, 2, 4, 6, 8]
durations = [2, 3, 3, 3, 4]
colors = ['#7c3aed', '#ec4899', '#f59e0b', '#06b6d4', '#10b981']

y_pos = np.arange(len(phases))

for i in range(len(phases)):
    ax.barh(y_pos[i], durations[i], left=start_months[i], height=0.45, color=colors[i], align='center', alpha=0.9)

ax.set_yticks(y_pos)
ax.set_yticklabels(phases, fontsize=10, fontweight='bold', color='#0f172a')
ax.invert_yaxis()  # top-down
ax.set_xlabel('Project Timeline (Months M1 - M12)', fontsize=11, fontweight='bold', labelpad=10)
ax.set_xlim(0, 13)
ax.set_xticks(range(1, 13))
ax.set_xticklabels([f'M{m}' for m in range(1, 13)], fontsize=10, fontweight='bold')
ax.set_title('12-Month Product Development & Growth Roadmap', fontsize=13, fontweight='bold', pad=15, color='#0f172a')

plt.tight_layout()
plt.savefig('report_assets/roadmap_timeline.png', bbox_inches='tight')
plt.close()

print('All 4 high-resolution diagram PNG assets generated successfully in report_assets/')
