import "./style.css";
import { setupCounter } from "./counter.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="/task" >
     Redirect to the task Page
    </a>
  
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
