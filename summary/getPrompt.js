export default function getPrompt(content) {
  return `
    Take the following markdown text and summarize it into one to three sentences. Your goal is to have this description accurately describe the content as well as rank as high as possible in Google search results since your response will be used as the OpenGraph description for this markdown document. Where applicable use keywords that people will search for on Google. In addition, give back an array of keywords that can be used as the OpenGraph keywords that people could use to search for this document. Give one to seven keywords. For the markdown doc you can ignore the images. Return the response in a valid JSON object with the format

    {
      "description": "<description goes here>",
      "keywords": [
        "keywords",
        "go",
        "here"
      ]
    }

    The markdown doc to summarize is:

    ${content}
  
  `;
}
