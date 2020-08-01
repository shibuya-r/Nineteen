export const isLengthwise = () => {
  const orientation = window.orientation;
  if (orientation === 0) {
    // 縦画面時の処理
    return false
  } else {
    // 横画面時の処理
    return true
  }
};
