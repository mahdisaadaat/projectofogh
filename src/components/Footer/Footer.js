import "./footer.scss";

const Footer = () => {
  const today = new Date();
  return (
    <footer className="Footer">
      <p>Designe By @Mahdisaadaat &copy; {today.getFullYear()}</p>
    </footer>
  );
};

export default Footer;
