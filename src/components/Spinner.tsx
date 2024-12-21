const Spinner = ({ size }: { size: string }) => <span className={`spinner-border ${size !== "big" && "spinner-border-sm"}`} role="status"></span>;

export default Spinner;
