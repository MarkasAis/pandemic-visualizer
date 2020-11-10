const a = [5000000, 1000000, 40000000, 200000000, 56000000, 100000, 1000000, 1000000, 12000000, 125000, 1000000, 45000000, 1100000, 1000000, 30000000, 200000, 770, 11000, 850, 848000];

a.sort((l, r) => {
  if (l < r) return -1;
  if (l > r) return 1;
  return 0;
});

for (let i = 1; i < a.length; i++) {
  console.log("Dim: " + (Math.sqrt(a[i]) / Math.sqrt(a[i-1])));
  console.log("Pix: " + a[i] / a[i-1]);
}
