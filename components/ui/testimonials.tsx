import { TestimonialCard } from "./testimonial-card";

export default function Testimonials() {
    return (
        <section>
            <h2>Testimonials</h2>

            <TestimonialCard
                author={{
                    name: "John",
                    handle: "@john",
                    avatar: "https://i.pravatar.cc/150?img=1",
                }}
                text="Amazing product!"
            />

            <TestimonialCard
                author={{
                    name: "Sarah",
                    handle: "@sarah",
                    avatar: "https://i.pravatar.cc/150?img=2",
                }}
                text="I love using this!"
            />
        </section>
    );
}