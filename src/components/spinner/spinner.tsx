import styles from './spinner.module.css'

const Spinner: React.FC = () => (
  <span className={`${styles.spinner} loading`} data-spinner></span>
)

export default Spinner
