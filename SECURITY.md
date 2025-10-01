# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

The VTech Makkers team takes security bugs seriously. We appreciate your efforts to responsibly disclose your findings, and will make every effort to acknowledge your contributions.

### How to Report Security Issues

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to: **security@tachmakkers.in**

If you prefer to encrypt your report, you can use our PGP key (available upon request).

Please include the following information in your report:

- Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

### Response Timeline

We will acknowledge receipt of your vulnerability report within **48 hours** and will send a more detailed response within **5 business days** indicating the next steps in handling your report.

After the initial reply to your report, the security team will endeavor to keep you informed of the progress towards a fix and full announcement, and may ask for additional information or guidance.

### Disclosure Policy

When the security team receives a security bug report, they will assign it to a primary handler. This person will coordinate the fix and release process, involving the following steps:

- Confirm the problem and determine the affected versions.
- Audit code to find any potential similar problems.
- Prepare fixes for all releases still under support.
- Release new versions and publish security advisories.

## Security Update Process

Security updates will be released as soon as possible after a vulnerability is confirmed. The process includes:

1. **Assessment**: We assess the vulnerability and its impact
2. **Development**: We develop a fix while maintaining backwards compatibility where possible
3. **Testing**: We thoroughly test the fix
4. **Release**: We release the update and notify users

## Best Practices for Users

To maintain security when using this application:

### For Administrators
- Keep your installation up to date with the latest version
- Use strong, unique passwords for all accounts
- Enable HTTPS/TLS for all communications
- Regularly backup your data
- Monitor application logs for suspicious activity
- Implement proper network security measures

### For Developers
- Keep all dependencies up to date
- Use environment variables for sensitive configuration
- Never commit secrets, API keys, or passwords to version control
- Implement proper input validation and sanitization
- Use CSRF protection for state-changing operations
- Follow the principle of least privilege for database access

### Environment Security
- Use secure environment variable management
- Implement proper database security measures
- Use secure communication protocols (HTTPS, WSS)
- Regular security audits and vulnerability assessments

## Security Features

This application includes several security features:

- **Input Validation**: All user inputs are validated and sanitized
- **SQL Injection Prevention**: Use of parameterized queries and ORM
- **XSS Protection**: Content Security Policy and output encoding
- **CSRF Protection**: Anti-CSRF tokens for state-changing operations
- **Authentication**: Secure session management
- **HTTPS**: Encrypted communication in production
- **Security Headers**: Comprehensive security headers implementation

## Dependencies

We regularly update our dependencies and monitor them for security vulnerabilities using automated tools. Key security-related dependencies include:

- Database ORM with parameterized queries
- Authentication and session management libraries
- Input validation and sanitization libraries
- Security header middleware

## Contact

For general security questions or concerns, contact us at:
- Email: security@tachmakkers.in
- Website: https://vtechmakkers.com
- Address: Near GEB, Ahmedabed Road, Butal, TA: Dhansura, Dist: Arvalli - 383 310

Thank you for helping keep VTech Makkers Equipment and our users safe!