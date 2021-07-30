import Link from "next/link"

export default function Logo() {
    return (
        <Link href="/" passHref>
            <div className="cursor-pointer" >
                <img
                    src={"/logo.png"}
                    height={30}
                    width={30}
                    alt="Logo ..."
                    className="mr-2"
                />
                <span style={{ color: '#707070', fontWeight: "bolder" }}>Mount Carmel School</span>
            </div>
        </Link>
    )
}