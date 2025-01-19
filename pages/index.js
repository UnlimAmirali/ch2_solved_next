import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Insurance Project</h1>
      <nav>
        <ul>
          <li>
            <Link href="/personal">Personal Info</Link>
          </li>
          <li>
            <Link href="/insurance">Third Party Insurance</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}