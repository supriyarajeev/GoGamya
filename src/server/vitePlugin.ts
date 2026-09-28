import type { Plugin } from 'vite';
import { parseTravelGoalWithGemini, simulateWhatIfWithThinking, generateGroundedRationale } from './geminiApi.ts';

export function geminiApiPlugin(): Plugin {
  return {
    name: 'gemini-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        // Parse JSON body helper
        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const data = body ? JSON.parse(body) : {};

            if (req.url === '/api/gemini/parse-goal') {
              const result = await parseTravelGoalWithGemini(data.goalText || '');
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(result));
              return;
            }

            if (req.url === '/api/gemini/what-if') {
              const result = await simulateWhatIfWithThinking(data.query || '', data.profileContext || {});
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(result));
              return;
            }

            if (req.url === '/api/gemini/explain-rationale') {
              const rationale = await generateGroundedRationale(data.recommendation || {}, data.goals || []);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ rationale }));
              return;
            }

            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Endpoint not found' }));
          } catch (err: any) {
            console.error('API Middleware error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err?.message || 'Internal Server Error' }));
          }
        });
      });
    },
  };
}
