<script>
    export let copyrightYear;
    export let stats;
</script>

<footer class="text-center p-4 p-lg-5">
    <p class="text-start" style="margin-bottom: 32px;font-size: 16px;">
        We've received&nbsp;
        <span class="font-monospace" style="color: rgb(255,255,255);background: rgb(33,37,41);border-radius: 10px;padding: 4px 12px;font-size: 14px;margin-right: 2px;margin-left: 2px;">
            {stats.count || '0'}
        </span>
        &nbsp;emails so far.
    </p>
    <p class="text-start" style="margin-bottom: 4px;font-size: 16px;">
        Made with lots of 🥨 in Germany
        <span class="float-end">
            <a href="/privacy" style="color: inherit;">Privacy</a>&nbsp;&nbsp;
            <a href="/terms" style="color: inherit;">Terms</a>&nbsp;&nbsp;
            <a href="https://github.com/berrysauce/justatemp/blob/main/LICENSE" target="_blank" style="color: inherit;">License</a>&nbsp;&nbsp;
            <a href="mailto:hey@firetempmail.com" style="color: inherit;">Contact</a>
        </span>
    </p>
    <p class="text-start" style="margin-bottom: 4px;font-size: 16px;">
        Copyright © {copyrightYear} berrysauce
    </p>
</footer>