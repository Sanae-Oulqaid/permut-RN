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
          "https://sleepy-jay-windbreaker.cyclic.app/professeurs"
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
      </head>
      <body>
        <canvas id="chart1"></canvas>
        <canvas id="chart2"></canvas>
        <canvas id="chart3"></canvas>
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
                // tooltip: {
                //   enabled: false, // Désactiver les infobulles
                // },
                legend: {
                     labels: {
                         // This more specific font property overrides the global property
                         font: {
                             size: 30
                         }
                     }
                 }
              },
              scales: {
                x: {
                  display: false, // Masquer l'axe des x
                },
                y: {
                  display: false, // Masquer l'axe des y
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
                // tooltip: {
                //   enabled: false, // Désactiver les infobulles
                // },
                legend: {
                     labels: {
                         // This more specific font property overrides the global property
                         font: {
                             size: 30
                         }
                     }
                 }
              },
              scales: {
                x: {
                  display: false, // Masquer l'axe des x
                },
                y: {
                  display: false, // Masquer l'axe des y
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
                // tooltip: {
                //   enabled: false, // Désactiver les infobulles
                // },
                legend: {
                     labels: {
                         // This more specific font property overrides the global property
                         font: {
                             size: 30
                         }
                     }
                 }
              },
              layout: {
             padding: {
                 left: 150,
                 right: 150
             }
         },
              scales: {
                x: {
                  display: false, // Masquer l'axe des x
                },
                y: {
                  display: false, // Masquer l'axe des y
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

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Text, View } from "react-native";
// import { WebView } from "react-native-webview";

// const Accueil = () => {
//   const [professorsData, setProfessorsData] = useState([]);

//   const calculateProfessorsByGrade = () => {
//     const professorsByGrade = {};

//     for (const professor of professorsData) {
//       const grade = professor.grade;
//       if (grade in professorsByGrade) {
//         professorsByGrade[grade] += 1;
//       } else {
//         professorsByGrade[grade] = 1;
//       }
//     }

//     return professorsByGrade;
//   };

//   useEffect(() => {
//     axios
//       .get("http://192.168.1.16:3000/professeurs")
//       .then((response) => {
//         setProfessorsData(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const htmlContent = `
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
//       </head>
//       <body>
//         <div class="chart"><canvas id="chart"></canvas></div>

//         <script>
//           const ctx = document.getElementById('chart').getContext('2d');

//           const professorsData = ${JSON.stringify(
//             calculateProfessorsByGrade()
//           )};
//           const labels = Object.keys(professorsData);
//           const data = Object.values(professorsData);

//           new Chart(ctx, {
//             type: 'pie',
//             data: {
//               labels: labels,
//               datasets: [
//                 {
//                   label: 'Professors by Grade',
//                   data: data,
//                   backgroundColor: 'rgba(75, 19, 192, 0.6)',
//                 },
//               ],
//             },
//             options: {
//               responsive: true,
//                plugins: {
//                 legend: {
//                     labels: {
//                         // This more specific font property overrides the global property
//                         font: {
//                             size: 35
//                         }
//                     }
//                 }
//             },
//             layout: {
//             padding: {
//                 left: 100,
//                 right: 100
//             }
//         }
//             },
//           });
//         </script>
//       </body>
//     </html>
//   `;

//   return <WebView originWhitelist={["*"]} source={{ html: htmlContent }} />;
// };

// export default Accueil;
