use leptos::*;
use leptos_meta::*;

#[component]
pub fn HomePage() -> impl IntoView {
    view! {
        <Title text="Alexander Berg2"/>
        // LANDING PAGE
        <div class="landing">
            <p class="command">$ print(Alex.Tensor())</p>
            <img class="logo light-mode" src="logo_light.svg" alt="Logo"/>
            // <img class="logo dark-mode" src="logo_dark.svg" alt="Logo">
            <div class="links">
                <a href="#projects">Alexander Berg</a>
                <span class="seperator">|</span>
                <a href="https://github.com/21st-centuryman">Github</a>
                <span class="seperator">|</span>
                <a href="#career">Career</a>
                <span class="seperator">|</span>
                <a href="mailto:alex@calexanderberg.com">"Alex@<this url>"</a>
            </div>
            <br/>
        </div>
        <hr/>
        // PROJECT PAGE
        <div id="projects">
            <h3>My favorite projects</h3>
            <div class="item-grid">
                <a href="https://github.com/21st-centuryman/Homelab" class="item">
                    <u>Homelab</u>
                    <p>
                        A collection of the services I self-host and my experience with backend technologies like NGINX, Linux, Docker, etc. As well as overall networking like reverse proxy, SSL, Load balancing, etc.
                    </p>
                </a>
                <a href="https://github.com/21st-centuryman/riscy_core" class="item">
                    <u>Riscy Core</u>
                    <p>
                        A 32-bit RISC V cpu I am building on the side of the school. I am really interested in the first principles of computing and would like to build as much of the tech stack by hand as possible.
                    </p>
                </a>
                <a href="https://github.com/21st-centuryman/advent_of_code" class="item">
                    <u>Advent of code</u>
                    <p>
                        I love programming paradigms, so I am trying to do as many days as I can in AOC using Haskell, Rust, Python, C, and Pytorch (basically rewriting everything in terms of tensors). In the future, I plan to do APL as well.
                    </p>
                </a>
                <a href="https://github.com/teeny-kth/teenygrad" class="item">
                    <u>Teenygrad-rs</u>
                    <p>
                        My thesis project, me and a friend will write an ML framework in Rust. Stay tuned for more!
                    </p>
                </a>
            </div>

        </div>
        <hr/>
        // WORK PAGE
        <div id="career">
            <h3>Resume</h3>
            <div class="item-grid">
                <div class="item">
                    <u>QA Analyst @ Nasdaq</u>
                    <p>
                        Hired as a QA test analyst student worker, responsible for writing tests and automation scripts for Nasdaq internal and external systems in the European Markets.
                    </p>
                </div>
                <div class="item">
                    <u>Founder @ RE-DO consulting</u>
                    <p>
                        Currently on ice. Started RE-DO in June 2020 to complement my studies. We help clients rethink their company image through marketing consulting, logo design, and web design.
                    </p>
                </div>
                <div class="item">
                    <u>IT support Assoc II intern @ AWS</u>
                    <p>
                        "Hired as a data center technician intern responsible for maintenance of AWS's servers in Eskilstuna, Sweden. Worked with a hardware responsible for services such as S3, EC2, and VPC. I was also taught how to manage these technologies on the software side."
                    </p>
                </div>
                <div class="item">
                    <u>Chairman @ KTH Blockchain initative</u>
                    <p>
                        A think tank I took over to promote, educate, and expand the horizon of blockchain technology and it sapplications. I dealt with long-term strategic planning, corporate relations, spokesperson for the organization, and recruitment, among others.
                    </p>
                </div>
            </div>
        </div>
        <hr/>
        // OTHER PAGE
        <h3>Other</h3>
        <p>
            I also have a <a href="https://21st-centuryman.github.io/">"<blog/>"</a>
            , where I write my views on tech, society, and everything else in between.
        </p>
        <p>
            This website is hosted on my Raspberry Pi 5 using NGINX, lets encrypt, and cloudflare.
        </p>
        <p class="command">$ whereami</p>
        <br/>
        <img src="./rack.png" class="logo" alt="Image of my network rack"/>
        <p>"<yes I know it's not a Linux command, suspend your disbelief/>"</p>
        <br/>
        <b>"If you're still interested I would love to keep in touch. My information is below:"</b>
        <hr/>
        <a href="https://github.com/21st-centuryman">Github</a>
        <br/>
        <a href="https://www.linkedin.com/in/calexanderberg/">Linkedin</a>
        <br/>
        <a href="tel:+46708128516">+46 708-12 85 16</a>
        <br/>
        <a href="mailto:alex@calexanderberg.com">Alex@calexanderberg.com</a>
        <br/>
        <p>cheers</p>
    }
}