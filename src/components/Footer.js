export default function footer() {
    return (
        <footer className="py-6 px-16 border-t border-gray-200 font-light flex flex-col lg:flex-row justify-between items-center">
            <p className="text-gray-700 mb-6 lg:mb-0">
                Copyright &copy; {new Date().getFullYear()}{' '}
                <a
                    href="https://www.creative-tim.com?ref=mtdk"
                    target="_blank"
                    rel="noreferrer"
                >
                    Creative Tim
                </a>
            </p>

            <ul className="list-unstyled flex">
                <li className="mr-6">
                    <a
                        className="text-gray-700 hover:text-gray-900 font-medium block text-sm"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Testing
                    </a>
                </li>
                {/* <li className="mr-6">
                    <a
                        className="text-gray-700 hover:text-gray-900 font-medium block text-sm"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Blog
                    </a>
                </li>
                <li className="mr-6">
                    <a
                        className="text-gray-700 hover:text-gray-900 font-medium block text-sm"
                        target="_blank"
                        rel="noreferrer"
                    >
                        MIT License
                    </a>
                </li>
                <li>
                    <a
                        className="text-gray-700 hover:text-gray-900 font-medium block text-sm"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Contact Us
                    </a>
                </li> */}
            </ul>
        </footer>
    );
}
