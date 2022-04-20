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
   // Grab all description & exercises columns
   const descriptionSections = document.querySelectorAll(".description")
   const exerciseSections = document.querySelectorAll(".exercise")

   // Itereate through description sections, grab their height & apply them to corresponding exercise column, in px
   descriptionSections.forEach((dSection, index) => {
      const fixedHeight = dSection.children[0].offsetHeight
      exerciseSections[index].children[0].style.height = `${fixedHeight}px`
   })
}
