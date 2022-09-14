import React from 'react'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Image from 'next/image'
import Link2 from 'next/link'
import CloseIcon from '@material-ui/icons/Close';
import cx from 'classnames'
import styles from '../styles/Home.module.css'
import {parseCookies} from 'nookies'
function Header() {
  const cookieuser = parseCookies()
  const user =  cookieuser.clientEmail 
  const [state2, toggleState2] = React.useState(1)
  const [state3, toggleState3] = React.useState(1)

    return (
        <div>
             {/* Top scroll */}
             <div className={ cx(styles.topScroll, styles.transition, styles.fixed) }>
              <a href="#banner" className={styles.scrollTo}><ExpandLessIcon /></a>
            </div>	
            {/* Top scroll End */}
            <header className={cx (styles.transition, styles.fixed)}>
              <div className={styles.container}>
                <div className={ cx(styles.row, styles.flexAlign) }>
                  <div className={cx (styles.collg4, styles.colmd3, styles.col8)}>
                    <div className={styles.logo}>
                      <Link2  href="/"><span style={{display: 'flex', flexDirection: 'row'}} ><Image height={40} width={40} src="/logo.png" alt="visibility: 'visible'" /><h1 style={{marginLeft: '0.5rem', color: '#888888', fontFamily: 'Poppins'}} >Atom</h1></span></Link2>
                    </div>
                  </div>
                  <div className={ cx(styles.collg8, styles.colmd9, styles.textRight) }>
                    <div  onClick={(e)=>{e.preventDefault();state2===1 ? toggleState2(2) : toggleState2(1)}} className={state2===2 ? cx (styles.menuToggle, styles.active) : styles.menuToggle}>
                     {state2===1 ? <span /> : <CloseIcon style={{color: '#16D5FF', fontSize: '2.5rem', marginTop: '-15px'}} />}
                    </div>
                    <div style={{display: state2===2 ? 'block' : null}} className={styles.menu}>
                      <ul className={styles.dInlineBlock}>
                        <li><Link2 style={{textDecoration: 'none'}}  href={user ? '/dashboard' : '/signup'}><a style={{textDecoration: 'none'}} >{user ? 'Dashboard' : 'Signup'}</a></Link2></li>
                      </ul>
                      <div className={cx (styles.signin, styles.dInlineBlock)}>
                        <Link2 href={user ? '/api/logout' : '/'} ><a className={styles.btn}>{user ? 'Logout' : 'Sign in'}</a></Link2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>
        </div>
    )
}

export default Header


export async function getServerSideProps(ctx){
  const {token, email} = parseCookies(ctx)

  return {
    props:{token}
  }

}