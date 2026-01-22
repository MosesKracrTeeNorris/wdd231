// course.mjs

const byuiCourse = {
  courseName: "WDD 231",
  sections: [
    {
      sectionNum: 1,
      roomNum: "CRM 214",
      enrolled: 16,
      days: "TUE",
      instructor: "Sis. Tarr",
    },
    {
      sectionNum: 2,
      roomNum: "CRM 232",
      enrolled: 29,
      days: "TTh",
      instructor: "Bro. Maxwell",
    },
    {
      sectionNum: 3,
      roomNum: "CRM 133",
      enrolled: 20,
      days: "MWF",
      instructor: "Sis. Nova",
    },
    
  ],

  // Method to change enrollment
  changeEnrollment: function (sectionNum, add = true) {
    const sectionIndex = this.sections.findIndex(
      (sec) => sec.sectionNum == sectionNum
    );
    if (sectionIndex >= 0) {
      if (add) {
        this.sections[sectionIndex].enrolled++;
      } else {
        this.sections[sectionIndex].enrolled--;
      }
      // REMOVED: renderSections(this.sections); // This line must be removed
      // as instructed, because renderSections is now in output.mjs
    }
  },
};

// Export the course object as the default export
 export default byuiCourse;

