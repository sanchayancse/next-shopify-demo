import axios from 'axios'

const About = ({ buildTimestamp, data }) => {
  return (
    <div>
      <p>Hello From my next.js app! Testing this 
      App built at: {buildTimestamp}
      Message: {data}
      </p>
      <div>
            <h1>See Every Color!</h1>
            <p>
                Enter a color in the URL to see how that color renders in your browser.
            </p>
            <p>The following URL formats are supported:</p>
            <ul>
                <li>
                    Named colors<br /> Format: <code>/named/:colorName</code><br /> Example: <a href="/named/tomato">/named/tomato</a>
                </li>
                <li>
                    API Hello<br /> Format: <code>/api/1-hello</code><br /> Example: <a href="/api/1-hello">/api/1-hello</a>
                </li>
                <li>
                    Hex colors<br /> Format: <code>/hex/:hexValue</code><br /> Example: <a href="/hex/bada55">/hex/bada55</a>
                </li>
                <li>
                    RGB colors<br /> Format: <code>/rgb/:red/:green/:blue</code><br /> Example: <a href="/rgb/80/90/100">/rgb/80/90/100</a>
                </li>
            </ul>
        </div>
    </div>
    
    
  )
}

export async function getStaticProps() {
  try{
    const {data} = await axios.get(process.env.NETLIFY_URL + '/api/1-hello');
    return {
      props: {
          data: data,
          buildTimestamp: Date.now(),
      }
  };
  } catch (error) {
      return {
        props: {
            data: '',
            buildTimestamp: Date.now(),
        }
    };
  }
}

export default About;