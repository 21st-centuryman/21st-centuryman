use leptos::*;
use leptos_meta::*;
use leptos_router::*;
use std::fs::File;
use std::io::Read;

#[component]
pub fn App(cx: Scope) -> impl IntoView {
    provide_meta_context(cx);

    view! {
        cx,
        <Stylesheet id="leptos" href="/pkg/tailwind.css"/>
        <Link rel="shortcut icon" type_="image/ico" href="/favicon.ico"/>
        <div class="text-white bg-slate-900 h-fit min-h-screen">
            <div class="max-w-6xl w-full mx-auto">
                <Header />
                <Router>
                    <Routes>
                        <Route path="" view=  move |cx| view! { cx, <Home/> }/>
                        <Route path="/blog" view=  move |cx| view! { cx, <Blog/> }/>
                        <Route path="/experience" view=  move |cx| view! { cx, <Experience/> }/>
                        <Route path="/contact" view=  move |cx| view! { cx, <Contact/> }/>
                    </Routes>
                </Router>
            </div>
        </div>
    }
}

#[component]
fn Header(cx: Scope) -> impl IntoView {
    view! { cx,
        <main class="flex justify-between items-center h-20 w-full px-14 bg-slate-800 rounded-b-xl" >
            <a class="px-6 text-4xl"  href="/">"21st Century Man"</a>
            <div class="text-2xl" >
                <a class="mx-1 p-2 transition duration-300 ease-in-out hover:bg-slate-700 rounded-xl" href="/blog">"blog"</a>
                <a class="mx-1 p-2 transition duration-300 ease-in-out hover:bg-slate-700 rounded-xl" href="/experience">"experience"</a>
                <a class="mx-1 p-2 transition duration-300 ease-in-out hover:bg-slate-700 rounded-xl" href="/contact">"contact"</a>
            </div>
        </main>
    }
}

#[component]
fn Home(cx: Scope) -> impl IntoView {
    view! { cx,
        <main class="h-max w-full my-40 px-24 text-left text-xl">
            <p>"Hello, I'm Alex, I go by the alter ego "<i>"21st Century Man"</i> " online. This website is a highlight of my experience and (more importantly) a collection of poorly researched, written, and overall unimportant views I have on life, work, and everything in between."</p>
            <br />
            <p>"So sit back and enjoy the journey. I'm happy to have you here."</p>
        </main>
    }
}

#[component]
fn Blog(cx: Scope) -> impl IntoView {
    view! { cx,
        <main class="my-0 mx-auto max-w-3xl text-center">
            <h2 class="p-6 text-4xl">"FUTURE FEATURE"</h2>
        </main>
    }
}

#[component]
fn Experience(cx: Scope) -> impl IntoView {
    let (render_state, set_render_state) = create_signal(cx, 0);

    //let render_types = {
    //    match i32::from(render_state) {
    //        1 => "work",
    //        2 => "project",
    //        3 => "education",
    //        _ => panic!("render_state is illegal"),
    //    }
    //};

    let _render = {
        let mut file = File::open("./data/experience.toml").expect("Failed to open file");
        let mut contents = String::new();
        file.read_to_string(&mut contents)
            .expect("Failed to read file");
        let parsed_toml = contents
            .parse::<toml::Value>()
            .expect("Failed to parse TOML");
        if let Some(table) = parsed_toml.get("work").and_then(toml::Value::as_table) {
            for (_key, value) in table {
                if let toml::Value::Table(entry) = value {
                    let time = entry
                        .get("time")
                        .and_then(toml::Value::as_str)
                        .map(|s| s.to_string())
                        .expect("Invalid time");
                    let place = entry
                        .get("place")
                        .and_then(toml::Value::as_str)
                        .map(|s| s.to_string())
                        .expect("Invalid place");
                    let title = entry
                        .get("title")
                        .and_then(toml::Value::as_str)
                        .map(|s| s.to_string())
                        .expect("Invalid title");
                    let institute = entry
                        .get("institute")
                        .and_then(toml::Value::as_str)
                        .map(|s| s.to_string())
                        .expect("Invalid institute");
                    let description = entry
                        .get("description")
                        .and_then(toml::Value::as_str)
                        .map(|s| s.to_string())
                        .expect("Invalid description");

                    view! { cx,
                        <ExperienceItem
                            title=title
                            location=place
                            institute=institute
                            time=time
                            work_type=String::from("edu")
                            description=description
                        />
                    };
                }
            }
        }
    };

    view! { cx,
        <main class="flex flex-col justify-center mx-auto w-full text-center">

            <p class="p-6 text-4xl">"Experience"</p>

            <div class="flex h-24 mx-72 items-center justify-between text-base" >
                <button
                    on:click=move |_| {set_render_state.update(|n| if *n == 0 {*n = 1} else {*n = 0});}
                    class="w-32 py-3 rounded-full bg-red-900 hover:bg-red-500 transition duration-300 ease-in-out"
                >
                    "Work"
                </button>
                <button
                    on:click=move |_| {set_render_state.update(|n| if *n == 0 {*n = 2} else {*n = 0});}
                    class="w-32 py-3 bg-violet-900 rounded-full hover:bg-violet-500 transition duration-300 ease-in-out"
                >
                    "Projects"
                </button>
                <button
                    on:click=move |_| {set_render_state.update(|n| if *n == 0 {*n = 3} else {*n = 0});}
                    class="w-32 py-3 bg-cyan-900 rounded-full hover:bg-cyan-500 transition duration-300 ease-in-out"
                >
                    "School"
                </button>
            </div>

            <p>
                {render_state}
            </p>


        </main>
    }
}

#[component]
fn ExperienceItem(
    cx: Scope,
    title: String,
    location: String,
    institute: String,
    time: String,
    work_type: String,
    description: String,
) -> impl IntoView {
    let work_types = {
        match work_type.as_str() {
            "pro" => {
                view! { cx, <p class="text-left rounded-full bg-red-900 w-fit px-3 py-0.5">"work"</p> }
            }
            "exp" => {
                view! { cx, <p class="text-left rounded-full bg-violet-900 w-fit px-3 py-0.5">"projects"</p> }
            }
            "edu" => {
                view! { cx, <p class="text-left rounded-full bg-cyan-900 w-fit px-3 py-0.5">"school"</p> }
            }
            _ => panic!("Work type does not exist"),
        }
    };
    view! { cx,
        <div class="h-72 mx-64 px-10 py-5 bg-black bg-opacity-30 rounded-xl text-base text-white">
            <div class="flex justify-between w-full">
                <p class="text-2xl">{title}</p>
                <p>{location}</p>
            </div>
            <div class="flex justify-between w-fullcity-100">
                <p>{institute}</p>
                <p>{time}</p>
            </div>
            {work_types}
            <p class="text-left">{description}</p>
        </div>
    }
}

#[component]
fn Contact(cx: Scope) -> impl IntoView {
    view! { cx,
        <main class=" h-max mx-auto my-40 flex flex-col justify-center text-center text-2xl w-max">
            <a>"carlalexanderberg@gmail.com"</a>
            <a class="hover:underline" href="https://github.com/21st-centuryman" target="_blank">"https://github.com/21st-centuryman"</a>
        </main>
    }
}
