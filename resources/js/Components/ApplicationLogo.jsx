export default function ApplicationLogo(props) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
            }}
        >
           {/* Image Logo */}
<img
    src={new URL("../../../public/logo.png", import.meta.url).href}
    alt="Logo"
    className="h-16 w-auto fill-current text-gray-500" // Increased height to h-16
    // Ensures compatibility with inline styles
/>

        </div>
    );
}
