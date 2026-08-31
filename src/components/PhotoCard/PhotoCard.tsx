import Image from 'next/image';
import Link from 'next/link';
import styles from './PhotoCard.module.css';

type PhotoCardProps = {
  href: string;
  src: string;
  alt: string;
  label: string;
  title: string;
  /** Set on the first row so those images load eagerly. */
  priority?: boolean;
};

export default function PhotoCard({
  href,
  src,
  alt,
  label,
  title,
  priority = false,
}: PhotoCardProps) {
  return (
    <Link href={href} className={styles.card}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw"
        className={styles.image}
      />
      <div className={styles.scrim} />
      <div className={styles.caption}>
        <p className={styles.label}>{label}</p>
        <h2 className={styles.title}>
          {title}
          <span className={styles.arrow} aria-hidden="true">→</span>
        </h2>
      </div>
    </Link>
  );
}
