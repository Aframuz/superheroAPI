/*=============================================
=             EXERCISE BODY HEIGHT            =
=============================================*/
// Initialize
exerciseHeightSetter()
imageRoundedTop()
// Execute HeightSetter on window resize
window.addEventListener("resize", () => {
   exerciseHeightSetter()
   imageRoundedTop()
})

// Set height of exercise column equal to description
function exerciseHeightSetter() {
   // Grab all description & exercises columns, declare breakpoints
   const descriptionSections = document.querySelectorAll(".description")
   const exerciseSections = document.querySelectorAll(".exercise")
   const breakpoints = {
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
   }

   // Change height if window width is above threshold, else remove height style attribute
   if (window.innerWidth > breakpoints["lg"]) {
      // Itereate through description sections, grab their height & apply them to corresponding exercise column, in px
      descriptionSections.forEach((dSection, index) => {
         const fixedHeight = dSection.children[0].offsetHeight
         exerciseSections[index].children[0].style.height = `${fixedHeight}px`
      })
      return
   } else {
      exerciseSections.forEach((eSection) => {
         if (eSection.children[0].getAttribute("style")) {
            eSection.children[0].style.removeProperty("height")
         }
      })
      return
   }
}

/*=============================================
=           HERO IMAGE ROUND BORDER           =
=============================================*/
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
               alert("error")
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
            const checkAppearance = (AppearanceData) => {
               return AppearanceData[0].includes("-")
                  ? "???"
                  : AppearanceData.join(" - ")
            }

            // Insert data into card info MANUALLY
            $(".sh-image").attr("src", usefulData.image)
            $(".sh-name").text(usefulData.name)
            $(".sh-aliases").text(usefulData.aliases)
            $(".sh-publisher").text(usefulData.publisher)
            $(".sh-first-appearance").text(usefulData.firstAppearance)
            $(".sh-weight").text(checkAppearance(usefulData.appearance.weight))
            $(".sh-height").text(checkAppearance(usefulData.appearance.height))
            $(".sh-occupation").text(usefulData.occupation)
            $(".sh-connections").text(usefulData.connections)
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
