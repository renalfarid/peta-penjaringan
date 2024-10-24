  // Load the JSON data
  fetch('statistik.json')
  .then(response => response.json())
  .then(data => {
     // Loop through each area in the JSON
     Object.keys(data).forEach(areaKey => {
          const areaData = data[areaKey]; // Get the data for each area
          const kecamatan = areaData[0].kecamatan;
          const dpt = areaData[1].dpt;
          const target = areaData[2].target;
          const penjaringan = areaData[3].penjaringan;
          const persen = areaData[4].persen;

          // Get the corresponding area element in the SVG
          const area = document.getElementById(areaKey);

          // Change color based on 'persen' value
          if (persen >= 100) {
              area.classList.add('highlight-yellow');
          } else if (persen >= 50) {
              area.classList.add('highlight-orange');
          } else {
              area.classList.add('highlight-pink');
          }

          // Add hover event to show tooltip
          area.addEventListener('mouseenter', function (event) {
              const tooltip = document.getElementById('tooltip');
              tooltip.innerHTML = `
                  <strong>Kecamatan:</strong> ${kecamatan}<br>
                  <strong>DPT:</strong> ${dpt}<br>
                  <strong>Target:</strong> ${target}<br>
                  <strong>Penjaringan:</strong> ${penjaringan}<br>
                  <strong>Persen:</strong> ${persen}%
              `;
              tooltip.style.display = 'block';
              tooltip.style.left = `${event.pageX + 10}px`;
              tooltip.style.top = `${event.pageY + 10}px`;
          });

          // Hide tooltip on mouse leave
          area.addEventListener('mouseleave', function () {
              const tooltip = document.getElementById('tooltip');
              tooltip.style.display = 'none';
          });

          // Update percentage text inside each area
          const textElement = document.getElementById(`text${areaKey.replace('area', '')}`);
          if (textElement) {
              textElement.textContent = persen + '%';
          }

      });
  })
  .catch(error => console.error('Error loading JSON:', error));