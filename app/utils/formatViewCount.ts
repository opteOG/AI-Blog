/**
 * 格式化阅读量（数字转易读字符串）
 * @param count 阅读量数字
 * @returns 格式化后的字符串（如 1K, 1.5M, 1.2B）
 */
export default function formatViewCount(count: number): string {
  if (count < 0) {
    return "0";
  }

  const units = ["", "K", "M", "B"]; // K:千, M:百万, B:十亿
  let unitIndex = 0;

  while (count >= 1000 && unitIndex < units.length - 1) {
    count /= 1000;
    unitIndex++;
  }

  // 处理小数部分（如 1.5K 显示为 1.5，但 1.0K 显示为 1）
  const formattedCount = Number.isInteger(count)
    ? count.toString()
    : count.toFixed(1).replace(/\.0$/, "");

  return `${formattedCount}${units[unitIndex]}`;
}
