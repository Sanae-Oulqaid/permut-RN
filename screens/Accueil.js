import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";

const Accueil = () => {
  const [professorsData, setProfessorsData] = useState([]);

  const calculateProfessorsBySpecialty = () => {
    const professorsBySpecialty = {};

    for (const professor of professorsData) {
      const specialty = professor.specialite;
      if (specialty in professorsBySpecialty) {
        professorsBySpecialty[specialty] += 1;
      } else {
        professorsBySpecialty[specialty] = 1;
      }
    }

    return professorsBySpecialty;
  };

  const calculateProfessorsByCity = () => {
    const professorsByCity = {};

    for (const professor of professorsData) {
      const cities = professor.villeDesiree.split(";");
      for (const city of cities) {
        if (city in professorsByCity) {
          professorsByCity[city] += 1;
        } else {
          professorsByCity[city] = 1;
        }
      }
    }

    return professorsByCity;
  };

  const calculateProfessorsByGrade = () => {
    const professorsByGrade = {};

    for (const professor of professorsData) {
      const grade = professor.grade;
      if (grade in professorsByGrade) {
        professorsByGrade[grade] += 1;
      } else {
        professorsByGrade[grade] = 1;
      }
    }

    return professorsByGrade;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://tiny-worm-nightgown.cyclic.app/professeurs"
        );
        const data = await response.json();
        setProfessorsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>
          h1 {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 16px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 16px;
          }
          th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          th {
            font-weight: bold;
          }
          td {
            font-size: 16px;
          }
        </style>
      </head>
      <body>
        <h1>Professors by Specialty</h1>
        <canvas id="chart1"></canvas>
        <table>
          <tr>
            <th>Specialty</th>
            <th>Number of Professors</th>
          </tr>
          ${Object.entries(calculateProfessorsBySpecialty())
            .map(
              ([specialty, count]) => `
              <tr>
                <td>${specialty}</td>
                <td>${count}</td>
              </tr>
            `
            )
            .join("")}
        </table>

        <h1>Professors by City</h1>
        <canvas id="chart2"></canvas>
        <table>
          <tr>
            <th>City</th>
            <th>Number of Professors</th>
          </tr>
          ${Object.entries(calculateProfessorsByCity())
            .map(
              ([city, count]) => `
              <tr>
                <td>${city}</td>
                <td>${count}</td>
              </tr>
            `
            )
            .join("")}
        </table>

        <h1>Professors by Grade</h1>
        <canvas id="chart3"></canvas>
        <table>
          <tr>
            <th>Grade</th>
            <th>Number of Professors</th>
          </tr>
          ${Object.entries(calculateProfessorsByGrade())
            .map(
              ([grade, count]) => `
              <tr>
                <td>${grade}</td>
                <td>${count}</td>
              </tr>
            `
            )
            .join("")}
        </table>

        <script>
          const ctx1 = document.getElementById('chart1').getContext('2d');
          const ctx2 = document.getElementById('chart2').getContext('2d');
          const ctx3 = document.getElementById('chart3').getContext('2d');

          const professorsData = ${JSON.stringify(
            calculateProfessorsBySpecialty()
          )};
          const labels1 = Object.keys(professorsData);
          const data1 = Object.values(professorsData);
          const backgroundColors1 = getRandomColors(data1.length);

          new Chart(ctx1, {
            type: 'pie',
            data: {
              labels: labels1,
              datasets: [
                {
                  label: 'Professors by Specialty',
                  data: data1,
                  backgroundColor: backgroundColors1,
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  labels: {
                    font: {
                      size: 30
                    }
                  }
                }
              },
              scales: {
                x: {
                  display: false,
                },
                y: {
                  display: false,
                },
              },
            },
          });

          const professorsByCityData = ${JSON.stringify(
            calculateProfessorsByCity()
          )};
          const labels2 = Object.keys(professorsByCityData);
          const data2 = Object.values(professorsByCityData);
          const backgroundColors2 = getRandomColors(data2.length);

          new Chart(ctx2, {
            type: 'pie',
            data: {
              labels: labels2,
              datasets: [
                {
                  label: 'Professors by City',
                  data: data2,
                  backgroundColor: backgroundColors2,
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  labels: {
                    font: {
                      size: 30
                    }
                  }
                }
              },
              scales: {
                x: {
                  display: false,
                },
                y: {
                  display: false,
                },
              },
            },
          });

          const professorsByGradeData = ${JSON.stringify(
            calculateProfessorsByGrade()
          )};
          const labels3 = Object.keys(professorsByGradeData);
          const data3 = Object.values(professorsByGradeData);
          const backgroundColors3 = getRandomColors(data3.length);

          new Chart(ctx3, {
            type: 'pie',
            data: {
              labels: labels3,
              datasets: [
                {
                  label: 'Professors by Grade',
                  data: data3,
                  backgroundColor: backgroundColors3,
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  labels: {
                    font: {
                      size: 30
                    }
                  }
                }
              },
              scales: {
                x: {
                  display: false,
                },
                y: {
                  display: false,
                },
              },
            },
          });

          function getRandomColors(count) {
            const colors = [];

            for (let i = 0; i < count; i++) {
              const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
              colors.push(color);
            }

            return colors;
          }
        </script>
      </body>
    </html>
  `;

  return <WebView originWhitelist={["*"]} source={{ html: htmlContent }} />;
};

export default Accueil;
