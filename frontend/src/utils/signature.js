const captureSignature = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // 设置画布大小
  canvas.width = 300;
  canvas.height = 150;

  // 绘制签名逻辑
  const draw = (event) => {
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
  };

  // 添加鼠标事件监听器
  canvas.addEventListener('mousedown', (event) => {
    canvas.addEventListener('mousemove', draw);
  });

  canvas.addEventListener('mouseup', () => {
    canvas.removeEventListener('mousemove', draw);
  });

  // 返回签名数据
  const getSignatureData = () => {
    return canvas.toDataURL();
  };

  return {
    canvas,
    getSignatureData,
  };
};

export default captureSignature;