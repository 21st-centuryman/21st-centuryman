use leptos::*;
use leptos_meta::*;
use leptos_router::*;

#[component]
pub fn App(cx: Scope) -> impl IntoView {
    provide_meta_context(cx);

    view! {
        cx,
        <Stylesheet id="leptos" href="/pkg/tailwind.css"/>
        <Link rel="shortcut icon" type_="image/ico" href="/favicon.ico"/>
        <div class="text-white bg-slate-900 h-fit min-h-screen">
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
    }
}

#[component]
fn Header(cx: Scope) -> impl IntoView {
    view! { cx,
        <main class="flex justify-between items-center h-20 max-w-6xl px-14 mx-auto bg-slate-800 rounded-b-xl" >
            <a class="px-6 text-4xl"  href="/">"21st Century Man"</a>
            <div class="text-2xl" >
                <a class="mx-1 p-2 transition duration-300 ease-in-out hover:bg-slate-700 rounded" href="/blog">"blog"</a>
                <a class="mx-1 p-2 transition duration-300 ease-in-out hover:bg-slate-700 rounded" href="/experience">"experience"</a>
                <a class="mx-1 p-2 transition duration-300 ease-in-out hover:bg-slate-700 rounded" href="/contact">"contact"</a>
            </div>
        </main>
    }
}

#[component]
fn Home(cx: Scope) -> impl IntoView {
    view! { cx,
        <main class="h-max mx-auto my-40 max-w-2xl text-left text-xl">
            <p>"Hello, I'm Alex, I go by the alter ego "<i>"21st Century Man"</i> " online. This website is a highlight of my experience and (more importantly) a collection of poorly researched, written, and overall unimportant views I have on life, work, and everything in between."</p>
            <br />
            <p>"You will not find any of the boring and idiodic left or right wing bs you read on the news and linkedin. If you want to see greenwashng on LinkedIn, or a Tweet \"owning the libs\", or any other egotistical pandering; this is not the place for you."</p>
            <br />
            <p>"So sit back. Grab a cup of coffee, and enjoy the journey. I'm happy to have you here."</p>
        </main>
    }
}

#[component]
fn Blog(cx: Scope) -> impl IntoView {
    view! { cx,
        <main class="my-0 mx-auto max-w-3xl text-center">
            <h2 class="p-6 text-4xl">"BLOG"</h2>
        </main>
    }
}

#[component]
fn Experience(cx: Scope) -> impl IntoView {
    view! { cx,
        <main class="my-0 mx-auto max-w-3xl text-center">
            <h2 class="p-6 text-4xl">"Experience"</h2>
        </main>
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
