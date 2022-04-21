/*=============================================
=             EXERCISE BODY HEIGHT            =
=============================================*/
// Initialize
exerciseHeightSetter()
// Execute HeightSetter on window resize
window.addEventListener("resize", () => {
   exerciseHeightSetter()
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
