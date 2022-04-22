/*=============================================
=           HERO IMAGE ROUND BORDER           =
=============================================*/
// Initialize
imageRoundedTop()
// Execute HeightSetter on window resize
window.addEventListener("resize", () => {
   imageRoundedTop()
})
// Add 'rounded-top' to image at certain width threshold
function imageRoundedTop() {
   // Get ALL SuperHero Info div & SuperHero image elements
   const shInfoDiv = document.querySelectorAll(".sh-info")
   const shImage = document.querySelectorAll(".sh-image")

   // Iterate through each DIV
   shInfoDiv.forEach((div, i) => {
      // If image width == CONTENT with of div (minus border)
      if (shImage[i].clientWidth - getContentWidth(div) == -2) {
         // If image does not have class, ADD
         if (!shImage[i].classList.contains("rounded-top")) {
            shImage[i].classList.add("rounded-top")
         }
      } else {
         // If image does have class, REMOVE
         if (shImage[i].classList.contains("rounded-top")) {
            shImage[i].classList.remove("rounded-top")
         }
      }
   })
}

// Get effective content width of an element
function getContentWidth(element) {
   // Get styles of element
   const styles = getComputedStyle(element)

   // Retunr width minus padding left & right
   return (
      element.clientWidth -
      parseFloat(styles.paddingLeft) -
      parseFloat(styles.paddingRight)
   )
}

/*=============================================
=               EVENT LISTENER                =
=============================================*/
// Wait for JQuery load...
$(function () {
   // On submit form a.k.a click button
   $("form").submit((event) => {
      event.preventDefault()

      // Scroll function
      jQuery.fn.scrollTo = function (elem, speed) {
         $(this).animate(
            {
               scrollTop:
                  $(this).scrollTop() -
                  $(this).offset().top +
                  $(elem).offset().top,
            },
            speed == undefined ? 500 : speed
         )
         return this
      }

      $("#scrollableEx").scrollTo("#info")

      // Get number and validate it
      const heroNumber = $("#heroNumber").val()
      if (!isNumberValid(heroNumber)) {
         console.log("no number")
         return
      }

      // AJAX method, GET info
      $.ajax({
         url: `https://www.superheroapi.com/api.php/2434431213368205/${heroNumber}`,
      })
         .done(function (data) {
            // placeholder error
            if (data.response == "error") {
               alert("No hay SuperHéroe con esa ID")
               return
            }

            // Parse usefulData
            const usefulData = {
               name: data.name,
               aliases: data.biography["aliases"],
               publisher: data.biography["publisher"],
               firstAppearance: data.biography["first-appearance"],
               appearance: {
                  height: data.appearance["height"],
                  weight: data.appearance["weight"],
               },
               occupation: data.work["occupation"],
               connections: data.connections["group-affiliation"],
               image: data.image["url"],
               powerstats: data.powerstats,
            }
            // If data exists format, if not replace
            const checkAppearance = (appearanceData) => {
               return appearanceData[0].includes("-")
                  ? "desconocido"
                  : appearanceData.join(" - ")
            }
            // If data does not exists, replace
            const checkData = (data) => {
               return data ? data : "-"
            }

            // Insert data into card info MANUALLY
            $(".sh-image").attr("src", usefulData.image)
            $(".sh-name").text(checkData(usefulData.name))
            $(".sh-aliases").text(checkData(usefulData.aliases))
            $(".sh-publisher").text(checkData(usefulData.publisher))
            $(".sh-first-appearance").text(
               checkData(usefulData.firstAppearance)
            )
            $(".sh-weight").text(checkAppearance(usefulData.appearance.weight))
            $(".sh-height").text(checkAppearance(usefulData.appearance.height))
            $(".sh-occupation").text(checkData(usefulData.occupation))
            $(".sh-connections").text(checkData(usefulData.connections))

            // Generate dataPoints stat array
            const stats = []
            for (const key in usefulData.powerstats) {
               if (usefulData.powerstats[key] === "null") {
                  stats.push({ y: 0, label: key })
               } else {
                  stats.push({ y: +usefulData.powerstats[key], label: key })
               }
            }

            // CHART
            var chart = new CanvasJS.Chart("sh-chart", {
               theme: "dark2", // "light1", "light2", "dark1", "dark2"
               exportEnabled: true,
               animationEnabled: true,
               title: {
                  text: `Estadísticas de Poder para ${usefulData.name}`,
               },
               data: [
                  {
                     type: "pie",
                     startAngle: 25,
                     toolTipContent: "<b>{label}</b>: {y}%",
                     showInLegend: "true",
                     legendText: "{label}",
                     indexLabelFontSize: 16,
                     indexLabel: "{label} - ({y})",
                     dataPoints: stats,
                  },
               ],
            })
            chart.render()
         })
         .fail(function () {
            console.error("Error fetching data")
         })
         .always(function () {
            console.log("Data consulted")
         })
   })

   // Validate if input is a number, return BOOLEAN
   function isNumberValid(num) {
      const onlyNumber = /^[+-]?\d+$/
      return onlyNumber.test(num)
   }
})
