import Link from 'next/link'

import HashicorpLogoSvg from '@hashicorp/mktg-logos/corporate/hashicorp/primary/white.svg?include'
import InlineSvg from '@hashicorp/react-inline-svg'

import NewsletterSignupForm from './components/newsletter-signup-form'
import IconFacebook from './social/icon-facebook'
import IconGithub from './social/icon-github'
import IconLinkedIn from './social/icon-linkedin'
import IconMeetup from './social/icon-meetup'
import IconTwitter from './social/icon-twitter'
import IconYouTube from './social/icon-youtube'
import Image from 'next/image'

function Footer({ openConsentManager = () => {}, showSignupForm }) {
  return (
    <footer className="g-footer">
      <div className="g-grid-container">
        {showSignupForm && (
          <div
            className="newsletter-section"
            data-testid="newsletterSignupForm"
          >
            <NewsletterSignupForm
              theme={{ background: 'dark' }}
              placement="footer"
            />
          </div>
        )}
        <div className="social-section">
          <InlineSvg className="hc-logo" src={HashicorpLogoSvg} />
          <ul>
            <li>
              <a
                href="https://github.com/hashicorp"
                target="_blank"
                rel="noopener noreferrer"
                title="Github"
                data-ga-footer="Social | Github"
              >
                <IconGithub />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/hashicorp"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter"
                data-ga-footer="Social | Twitter"
              >
                <IconTwitter />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/HashiCorp"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
                data-ga-footer="Social | YouTube"
              >
                <IconYouTube />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/hashicorp/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                data-ga-footer="Social | LinkedIn"
              >
                <IconLinkedIn />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/HashiCorp/"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                data-ga-footer="Social | Facebook"
              >
                <IconFacebook />
              </a>
            </li>
            <li>
              <a
                href="https://www.meetup.com/pro/hugs"
                target="_blank"
                rel="noopener noreferrer"
                title="Meetup"
                data-ga-footer="Social | Meetup"
              >
                <IconMeetup />
              </a>
            </li>
          </ul>
        </div>
        <div className="primary-section">
          <ul className="solutions">
            <li>
              <span className="label">Infrastructure</span>
              <Link href="/products/terraform">
                <a
                  className="product-link"
                  data-ga-footer="Solutions | Terraform"
                >
                  <div className="product-icon">
                    <Image
                      src={require('@hashicorp/flight-icons/svg/terraform-color-16.svg')}
                      alt=""
                      height={16}
                      width={16}
                    />
                  </div>
                  <span className="solution">Terraform</span>
                </a>
              </Link>
              <a
                className="product-link"
                data-ga-footer="Solutions | Packer"
                href="https://www.packer.io"
              >
                <div className="product-icon">
                  <Image
                    src={require('@hashicorp/flight-icons/svg/packer-color-16.svg')}
                    alt=""
                    height={16}
                    width={16}
                  />
                </div>
                <span className="solution">Packer</span>
              </a>
            </li>
            <li>
              <span className="label">Networking</span>
              <Link href="/products/consul">
                <a className="product-link" data-ga-footer="Solutions | Consul">
                  <div className="product-icon">
                    <Image
                      src={require('@hashicorp/flight-icons/svg/consul-color-16.svg')}
                      alt=""
                      height={16}
                      width={16}
                    />
                  </div>
                  <span className="solution">Consul</span>
                </a>
              </Link>
            </li>
            <li>
              <span className="label">Security</span>
              <Link href="/products/vault">
                <a className="product-link" data-ga-footer="Solutions | Vault">
                  <div className="product-icon">
                    <Image
                      src={require('@hashicorp/flight-icons/svg/vault-color-16.svg')}
                      alt=""
                      height={16}
                      width={16}
                    />
                  </div>
                  <span className="solution">Vault</span>
                </a>
              </Link>
              <a
                className="product-link"
                data-ga-footer="Solutions | Boundary"
                href="https://www.boundaryproject.io"
              >
                <div className="product-icon">
                  <Image
                    src={require('@hashicorp/flight-icons/svg/boundary-color-16.svg')}
                    alt=""
                    height={16}
                    width={16}
                  />
                </div>
                <span className="solution">Boundary</span>
              </a>
            </li>
            <li>
              <span className="label">Applications</span>
              <Link href="/products/nomad">
                <a className="product-link" data-ga-footer="Solutions | Nomad">
                  <div className="product-icon">
                    <Image
                      src={require('@hashicorp/flight-icons/svg/nomad-color-16.svg')}
                      alt=""
                      height={16}
                      width={16}
                    />
                  </div>
                  <span className="solution">Nomad</span>
                </a>
              </Link>
              <a
                className="product-link"
                data-ga-footer="Solutions | Waypoint"
                href="https://www.waypointproject.io"
              >
                <div className="product-icon">
                  <Image
                    src={require('@hashicorp/flight-icons/svg/waypoint-color-16.svg')}
                    alt=""
                    height={16}
                    width={16}
                  />
                </div>
                <span className="solution">Waypoint</span>
              </a>
              <a
                className="product-link"
                data-ga-footer="Solutions | Vagrant"
                href="https://www.vagrantup.com"
              >
                <div className="product-icon">
                  <Image
                    src={require('@hashicorp/flight-icons/svg/vagrant-color-16.svg')}
                    alt=""
                    height={16}
                    width={16}
                  />
                </div>
                <span className="solution">Vagrant</span>
              </a>
            </li>
          </ul>
          <div className="link-list">
            <span className="label">Resources</span>
            <ul>
              <li>
                <Link href="/blog">
                  <a data-ga-footer="Resources | Blog">Blog</a>
                </Link>
              </li>
              <li>
                <a
                  href="https://learn.hashicorp.com"
                  data-ga-footer="Resources | Tutorials"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <Link href="/community/">
                  <a data-ga-footer="Resources | Community">Community</a>
                </Link>
              </li>
              <li>
                <Link href="/events">
                  <a data-ga-footer="Resources | Events">Events</a>
                </Link>
              </li>
              <li>
                <Link href="/partners/find-a-partner?category=tech">
                  <a data-ga-footer="Resources | Integrations">Integrations</a>
                </Link>
              </li>
              <li>
                <Link href="/resources">
                  <a data-ga-footer="Resources | Library">Library</a>
                </Link>
              </li>
              <li>
                <Link href="/partners">
                  <a data-ga-footer="Resources | Partners">Partners</a>
                </Link>
              </li>
              <li>
                <a
                  href="/resources?type=hashicast"
                  data-ga-footer="Resources | Podcast"
                >
                  Podcast
                </a>
              </li>
              <li>
                <Link href="/customer-success">
                  <a data-ga-footer="Resources | Support">Support</a>
                </Link>
              </li>
              <li>
                <Link href="/training">
                  <a data-ga-footer="Resources | Training">Training</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="link-list">
            <span className="label">Company</span>
            <ul>
              <li>
                <Link href="/about">
                  <a data-ga-footer="Company | About Us">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/jobs">
                  <a data-ga-footer="Company | Jobs">
                    Jobs<span className="tag">We&apos;re Hiring</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/press">
                  <a data-ga-footer="Company | Press Center">Press Center</a>
                </Link>
              </li>
              <li>
                <a
                  href="https://ir.hashicorp.com"
                  data-ga-footer="Company | Investors"
                >
                  Investors
                </a>
              </li>
              <li>
                <Link href="/brand">
                  <a data-ga-footer="Company | Brand">Brand</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a data-ga-footer="Company | Contact Us">Contact Us</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="secondary-section">
          <ul>
            <li>
              <a
                href="https://status.hashicorp.com/"
                data-ga-footer="Bottom | System Status"
              >
                System Status
              </a>
            </li>
            {openConsentManager && (
              <li>
                <button
                  className="consent-manager"
                  data-testid="consentManager"
                  data-ga-footer="Bottom | Cookie Manager"
                  onClick={openConsentManager}
                >
                  Cookie Manager
                </button>
              </li>
            )}
          </ul>
          <ul>
            <li>
              <Link href="/terms-of-service">
                <a data-ga-footer="Bottom | Terms of Use">Terms of Use</a>
              </Link>
            </li>
            <li>
              <Link href="/security">
                <a data-ga-footer="Bottom | Security">Security</a>
              </Link>
            </li>
            <li>
              <Link href="/privacy">
                <a data-ga-footer="Bottom | Privacy">Privacy</a>
              </Link>
            </li>
            <li>
              <Link href="/trademark-policy">
                <a data-ga-footer="Bottom | Trademark Policy">
                  Trademark Policy
                </a>
              </Link>
            </li>
            <li>
              <Link href="/trade-controls">
                <a data-ga-footer="Bottom | Trade Controls">Trade Controls</a>
              </Link>
            </li>
          </ul>
        </div>
        <span
          className="not-a-bug"
          data-text="This is not a bug on the website, but rather an inside joke
          for some of our oldest customers."
          title="No, this is not a bug"
        >
          stdin: is not a tty
        </span>
      </div>
    </footer>
  )
}

Footer.defaultProps = {
  showSignupForm: true,
}

export default Footer
