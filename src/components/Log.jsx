import React from 'react';

function Log({ logs }) {
    return (
        <section id="log" className="container">
            <h2>Battle Log</h2>
            <ul className="log-entries">
                {logs.map((log, index) => (
                    <li key={index} className={log.isDamage ? 'log--damage' : 'log--heal'}>
                        <span>{log.isPlayer ? 'Player' : 'Monster'}</span>
                        <span>{log.text}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Log;