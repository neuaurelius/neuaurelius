import Nav from "../Nav";
import "./careers.css";

export const metadata = {
    title: "Careers | Neuaurelius",
    description: "Join our team at Neuaurelius",
};

export default function Careers() {
    return (
        <>
            <Nav />
            <main className="careers-container">
                <section className="careers-hero">
                    <h1>Join Our Team</h1>
                    <p>We're building the future of embodied intelligence</p>
                </section>

                <section className="careers-content">
                    <div className="job-listings">
                        <div className="job-card">
                            <h2>Senior AI Engineer</h2>
                            <p className="job-location">Remote</p>
                            <p className="job-description">
                                We're seeking an experienced AI engineer to help develop cutting-edge embodied intelligence systems.
                            </p>
                            <button className="apply-btn">Learn More</button>
                        </div>

                        <div className="job-card">
                            <h2>Full Stack Developer</h2>
                            <p className="job-location">Remote</p>
                            <p className="job-description">
                                Join our team to build scalable applications powering next-generation AI systems.
                            </p>
                            <button className="apply-btn">Learn More</button>
                        </div>

                        <div className="job-card">
                            <h2>Robotics Specialist</h2>
                            <p className="job-location">San Francisco, CA</p>
                            <p className="job-description">
                                Help us design and implement embodied AI systems that interact with the physical world.
                            </p>
                            <button className="apply-btn">Learn More</button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
