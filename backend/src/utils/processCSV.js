const fs = require('fs');
const csv = require('csv-parser');

export const processCSV = async (filePath) => {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        const user = {
          username: data.username,
          password: data.password,
          roles: [data.roles], // 假设 roles 是单个字符串
          profile: {
            skills: data.skills.split(','),
            certifications: data.certifications.split(','),
            experience: data.experience,
          }
        };
        results.push(user);
      })
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
};