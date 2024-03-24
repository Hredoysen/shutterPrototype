const releaseNotes = [
  {
    version: '1.0.0',
    releaseDate: 'September 10, 2023',
    feat: [
      {
        color: 'green',
        children: 'MyBrac now has all the cards organized in Side Navigation',
      },
      {
        color: 'green',
        children:
          'Search feature can search through brac employees & MyBrac Application',
      },
    ],
    fix: [
      {
        color: 'purple',
        children: 'filter',
      },
    ],
    issue: [
      {
        color: 'red',
        children:
          'All permission must have admin access permissions to access admin.',
      },
    ],
  },
];

releaseNotes.sort((a, b) => {
  const versionA = a.version.split('.').map(Number);
  const versionB = b.version.split('.').map(Number);

  // Compare each component of the version numbers
  for (let i = 0; i < Math.max(versionA.length, versionB.length); i++) {
    const componentA = versionA[i] || 0;
    const componentB = versionB[i] || 0;

    if (componentA > componentB) {
      return -1; // Indicates that versionA comes before versionB
    } else if (componentA < componentB) {
      return 1; // Indicates that versionA comes after versionB
    }
  }

  return 0; // Versions are equal
});
export default releaseNotes;
