export const cases = [
  {
    label: 'Simple split',
    description: 'One way splits alone, with no other intersections',
    center: [-79.31593,43.74138],
    zoom: 17.5
  },{
    label: 'Split intersection',
    description: 'one way splits at an intersection',
    center: [-79.20483,43.78254],
    zoom: 18
  },{
    label: 'Split intersection w/ slip lanes',
    description: 'one way splits at an intersection with mapped slip lanes',
    center: [-79.26793,43.70699],
    zoom: 17.5
  },{
    label: 'Double split intersection',
    description: 'two ways split at an intersection',
    center: [-79.28465,43.74752],
    zoom: 17
  },{
    label: 'Complex case #1',
    description: 'multiple intersecting splits with turn lanes',
    center: [-79.24651,43.73634],
    zoom: 16
  },{
    label: 'Major divergence #1',
    description: 'Spadina Crescent; Complicated in part because the circle has a different name from the rest of Spadina.',
    center: [-79.40049,43.65969],
    zoom: 16.5
  },{
    label: 'Major divergence #2',
    description: 'Lake Shore West; this, I would think, would not get merged in most cases.',
    center: [-79.43307,43.63246],
    zoom: 15.5
  }
]
