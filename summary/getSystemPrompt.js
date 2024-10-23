export default function getSystemPrompt(course) {
  return `
    Take the following markdown text and summarize it into one to three sentences. Your goal is to have this description accurately describe the content as well as rank as high as possible in Google search results since your response will be used as the OpenGraph description for this markdown document. Where applicable use keywords that people will search for on Google. In addition, give back an array of keywords that can be used as the OpenGraph keywords that people could use to search for this document. Give one to seven keywords. For the markdown doc you can ignore the images.

    Here is general metadata for the course. Reference it as necessary. Always reference the author's name.

    The author is the course is: ${course.author.name}
    The company for which the author works for is: 
    The title of the course is: ${course.title}
    The subtitle of the course is: ${course.subtitle}
    The overall course description is: ${course.description}
    The overall keywords for the course are: ${course.keywords.join(", ")}

    Here's the response you will give
    {
      "seoDescription": "<description goes here>",
      "seoKeywords": [
        "keywords",
        "go",
        "here"
      ]
    }
  
  `;
}
