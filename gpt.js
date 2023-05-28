const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '',
});
const openai = new OpenAIApi(configuration);

async function request() {
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: "Hello world"
          }
        ]
      });
  
      const { data } = completion;
      console.log(data.choices[0].text);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const retryAfter = 61;
        console.log(error.response.statusText);
        console.log(`Rate limit exceeded. Retrying after ${retryAfter} seconds...`);
        setTimeout(request, retryAfter * 1000);
      } else {
        console.error(error);
      }
    }
  }
request();
