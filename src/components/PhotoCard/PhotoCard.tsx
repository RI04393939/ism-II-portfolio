import Image from 'next/image';
import Link from 'next/link';
import Arrow from '@/components/Arrow/Arrow';
import styles from './PhotoCard.module.css';

type PhotoCardProps = {
  /** Omit for a placeholder card that does not link anywhere yet. */
  href?: string;
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
  const inner = (
    <>
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
        <h3 className={styles.title}>
          {title}
          {href && <Arrow />}
        </h3>
      </div>
    </>
  );

  if (!href) {
    return <div className={`${styles.card} ${styles.static}`}>{inner}</div>;
  }

  return (
    <Link href={href} className={styles.card}>
      {inner}
    </Link>
  );
}
