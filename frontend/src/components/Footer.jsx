import '../styles/footer.css';

const Footer = () => {
    return(
        <footer className="footerContainer">
            <p>&copy; {new Date().getFullYear()} Myissues Charity</p>
        </footer>
    )
}

export default Footer